import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCardSection from "../global/CourseCardSectionMain";
import { sealtourService } from "../../apis/sealtour";

export default function PopularSpotList() {
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 데이터 가져오기
  const fetchPopularSpots = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await sealtourService.getPopularSpots();
      setSpots(response.data || []);
    } catch (err) {
      console.error("인기 관광지 데이터 조회 실패:", err);
      setError(err);
      setSpots([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPopularSpots();
  }, []);

  // 카드 클릭 핸들러
  const handleCardClick = (spot) => {
    navigate(`/place/${spot.spotId}`, {
      state: {
        headerTitle: "관광지 상세보기",
      },
    });
  };

  // API 응답 데이터를 CourseCardSection 형식으로 변환
  const popularCards = spots.map((spot) => ({
    id: spot.spotId,
    image: spot.imageUrl,
    name: spot.name,
    location: spot.hashtag
      ? spot.hashtag.map((tag) => `# ${tag}`).join("\n")
      : "",
    originalData: spot, // 원본 데이터 보존
  }));

  return (
    <CourseCardSection
      title="인기 경북씰 관광지"
      sub="요즘 인기 있는 관광지에서 경북씰을 모아보세요!"
      cards={popularCards}
      loading={loading}
      error={error}
      onCardClick={handleCardClick}
    />
  );
}
4;
