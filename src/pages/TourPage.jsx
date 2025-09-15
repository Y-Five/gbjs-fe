import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import { LocationCard, TourSection, ChatSection } from '../components/tour';
import { SearchBoxContainer as SearchBox } from '../components/global';
import styles from './TourPage.module.css';
import { getPlacesWithinDistance } from '../data/placeDetailData';
import { useGeolocation } from '../hooks/useGeolocation';
import { useAuth } from '../hooks/useAuth';
import { getMyInfo } from '../apis/myPageApi';

const MAX_DISTANCE_KM = 20;
const MAX_DISPLAY_COUNT = 5;

export default function TourPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const geolocation = useGeolocation();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const [nickname, setNickname] = useState('게스트님');
  const [isLoadingNickname, setIsLoadingNickname] = useState(true);

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

  const sortedTourData = useMemo(
    () =>
      getPlacesWithinDistance(MAX_DISTANCE_KM)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, MAX_DISPLAY_COUNT),
    []
  );

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
        <TourSection tourData={sortedTourData} onTourClick={handleTourClick} />
        <ChatSection onChatClick={handleChatClick} />
      </div>
    </div>
  );
}
