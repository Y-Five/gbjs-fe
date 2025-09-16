import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import { LocationCard, TourSection, ChatSection } from '../components/tour';
import { SearchBoxContainer as SearchBox } from '../components/global';
import styles from './TourPage.module.css';
import { useGeolocation } from '../hooks/useGeolocation';
import { useAuth } from '../hooks/useAuth';
import { getMyInfo } from '../apis/myPageApi';
import { getNearbyAudioGuides } from '../apis/spotApi';

export default function TourPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const geolocation = useGeolocation();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const [nickname, setNickname] = useState('게스트님');
  const [isLoadingNickname, setIsLoadingNickname] = useState(true);
  const [tourData, setTourData] = useState([]);
  const [isLoadingTourData, setIsLoadingTourData] = useState(true);
  const [tourDataError, setTourDataError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      // 로그인 상태가 아니면 게스트로 설정
      if (!isLoggedIn) {
        setNickname('게스트님');
        setIsLoadingNickname(false);
        return;
      }

      try {
        const userInfo = await getMyInfo();
        console.log('User info API response:', userInfo); // 디버깅용
        if (userInfo && userInfo.nickname) {
          setNickname(`${userInfo.nickname}님`);
          console.log('Nickname set to:', userInfo.nickname); // 디버깅용
        } else {
          console.log('No nickname in user info or userInfo is null'); // 디버깅용
          setNickname('게스트님'); // 기본값
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setNickname('게스트님'); // 에러 시 기본값
      } finally {
        setIsLoadingNickname(false);
      }
    };

    // 인증 상태 로딩이 완료된 후에만 사용자 정보 조회
    if (!isAuthLoading) {
      fetchUserInfo();
    }
  }, [isLoggedIn, isAuthLoading]);

  // 근처 음성 가이드 관광지 데이터 가져오기
  const fetchTourData = async () => {
    if (!geolocation.coordinates.lat || !geolocation.coordinates.lng) {
      console.log('위치 정보가 없어서 API 요청을 건너뜁니다:', geolocation);
      return;
    }

    try {
      setIsLoadingTourData(true);
      setTourDataError(null);
      console.log(
        'API 요청 시작:',
        geolocation.coordinates.lat,
        geolocation.coordinates.lng
      );
      const response = await getNearbyAudioGuides(
        geolocation.coordinates.lat,
        geolocation.coordinates.lng
      );

      console.log('API 응답:', response);
      if (response.code === 'SUCCESS' && response.data) {
        // API 응답 데이터를 TourSection에서 사용하는 형태로 변환
        const transformedData = response.data.map((item) => ({
          id: item.contentId,
          name: item.title,
          image: item.image,
          distance: 0, // API에서 거리 정보가 없으므로 0으로 설정
          type: item.hashtag,
        }));
        console.log('변환된 데이터:', transformedData);
        setTourData(transformedData);
      } else {
        console.error('Failed to fetch tour data:', response);
        setTourData([]);
        setTourDataError('데이터를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching tour data:', error);
      setTourData([]);
      setTourDataError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoadingTourData(false);
    }
  };

  useEffect(() => {
    fetchTourData();
  }, [geolocation.coordinates.lat, geolocation.coordinates.lng]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
        state: { from: location.pathname },
      });
    }
  };

  const handleTourClick = (tour) => navigate(`/place/${tour.id}`);
  const handleChatClick = () => navigate('/chat');

  return (
    <div className={styles.container}>
      <Header title="관광지투어" isDark={true} />
      <div className={styles.content}>
        <SearchBox
          placeholder="경북의 어떤 관광지를 찾으세요?"
          onSearch={handleSearch}
          readOnly={true}
        />
        <LocationCard
          location={geolocation}
          userName={nickname}
          isLoadingNickname={isLoadingNickname}
        />
        <TourSection
          tourData={tourData}
          onTourClick={handleTourClick}
          loading={isLoadingTourData}
          error={tourDataError}
          onRetry={fetchTourData}
        />
        <ChatSection onChatClick={handleChatClick} />
      </div>
    </div>
  );
}
