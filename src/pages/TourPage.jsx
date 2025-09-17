import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import { LocationCard, TourSection, ChatSection } from '../components/tour';
import { SearchBoxContainer as SearchBox } from '../components/global';
import styles from './TourPage.module.css';
import { useGeolocation } from '../hooks/useGeolocation';
import { useAuth } from '../hooks/useAuth';
import { getNickname } from '../apis/myPageApi';
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
  const [isNoNearbyData, setIsNoNearbyData] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      // 로그인 상태가 아니면 게스트로 설정
      if (!isLoggedIn) {
        setNickname('게스트님');
        setIsLoadingNickname(false);
        return;
      }

      try {
        const response = await getNickname();
        if (response && typeof response === 'string' && response.trim()) {
          // API가 직접 닉네임 문자열을 반환하는 경우
          setNickname(`${response}님`);
        } else if (response && response.code === 'SUCCESS' && response.data) {
          // API가 객체 형태로 반환하는 경우
          setNickname(`${response.data}님`);
        } else {
          setNickname('게스트님'); // 기본값
        }
      } catch (error) {
        console.error('Failed to fetch nickname:', error);
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
      return;
    }

    try {
      setIsLoadingTourData(true);
      setTourDataError(null);
      setIsNoNearbyData(false);

      const response = await getNearbyAudioGuides(
        geolocation.coordinates.lat,
        geolocation.coordinates.lng
      );

      // API가 직접 배열을 반환하는 경우
      if (Array.isArray(response)) {
        if (response.length > 0) {
          // 데이터가 있는 경우
          const transformedData = response.map((item) => ({
            id: item.contentId,
            name: item.title,
            image: item.image,
            distance: 0,
            type: item.hashtag,
          }));
          setTourData(transformedData);
          setIsNoNearbyData(false);
        } else {
          // 빈 배열인 경우 - 근처 관광지가 없음
          setTourData([]);
          setIsNoNearbyData(true);
        }
      } else if (response.code === 'SUCCESS') {
        // 객체 형태로 응답하는 경우
        if (Array.isArray(response.data) && response.data.length > 0) {
          const transformedData = response.data.map((item) => ({
            id: item.contentId,
            name: item.title,
            image: item.image,
            distance: 0,
            type: item.hashtag,
          }));
          setTourData(transformedData);
          setIsNoNearbyData(false);
        } else if (Array.isArray(response.data) && response.data.length === 0) {
          setTourData([]);
          setIsNoNearbyData(true);
        } else {
          setTourData([]);
          setIsNoNearbyData(true);
        }
      } else {
        // API 에러
        setTourData([]);
        setTourDataError('데이터를 불러올 수 없습니다.');
        setIsNoNearbyData(false);
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
          isNoNearbyData={isNoNearbyData}
        />
        <ChatSection onChatClick={handleChatClick} />
      </div>
    </div>
  );
}
