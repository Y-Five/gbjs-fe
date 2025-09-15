import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EventMap.module.css";
import GyeongbukMap from "../regionMap/GyeongbukMap";
import festival1 from "../../assets/images/festival1.png";
import { festivalService } from "../../apis/main";

export default function EventMap() {
  const navigate = useNavigate();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("경주시");

  // 컴포넌트 마운트 시 경주시 축제 데이터 가져오기
  useEffect(() => {
    fetchFestivals("경주시");
  }, []);

  // 축제 데이터 가져오기
  const fetchFestivals = async (region) => {
    setLoading(true);
    setError(null);

    try {
      const data = await festivalService.getFestivals(region, 1, 3);
      setFestivals(data.data?.content || []);
      setSelectedRegion(region);
    } catch (err) {
      setError(err.message || "축제 정보를 가져올 수 없습니다.");
      console.error("축제 데이터 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 지도에서 지역 선택 시 축제 데이터 가져오기
  const handleRegionSelect = (regionName) => {
    console.log("선택된 지역:", regionName);
    fetchFestivals(regionName);
  };

  // 축제 카드 클릭 시 상세 페이지로 이동
  const handleFestivalClick = (contentid) => {
    navigate(`/festival/${contentid}`);
  };

  // 날짜 포맷팅 함수 (YYYYMMDD -> YYYY년 MM월 DD일)
  const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return dateString;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>행사지도</h3>
      <p className={styles.sub}>경북의 행사를 지도로 한 눈에 살펴봐요!</p>

      <div className={styles.map}>
        <GyeongbukMap
          onSelect={handleRegionSelect}
          defaultSelected={["경주시"]}
        />
      </div>

      <div className={styles.eventList}>
        {loading ? (
          <div className={styles.loading}>축제 정보를 불러오는 중...</div>
        ) : error ? (
          <div className={styles.error}>축제 정보를 가져올 수 없습니다</div>
        ) : festivals.length > 0 ? (
          festivals.map((festival, index) => (
            <div
              key={festival.contentid || index}
              className={styles.eventCard}
              onClick={() => handleFestivalClick(festival.contentid)}
            >
              <img
                src={festival.firstimage || festival1}
                alt={festival.title || "축제 이미지"}
                className={styles.eventImage}
              />
              <div className={styles.eventInfo}>
                <p className={styles.eventLocation}>
                  {festival.addr1 || "위치 정보 없음"}
                </p>
                <p className={styles.eventTitle}>
                  {festival.title || "축제명 없음"}
                </p>
                <p className={styles.eventDate}>
                  {festival.eventstartdate && festival.eventenddate
                    ? `${formatDate(festival.eventstartdate)} ~ ${formatDate(
                        festival.eventenddate
                      )}`
                    : "일정 정보 없음"}
                </p>
              </div>
            </div>
          ))
        ) : selectedRegion ? (
          <div className={styles.noDataCard}>
            <div className={styles.noDataTitle}>
              {selectedRegion}의 진행 행사가 없습니다.
            </div>
            <div className={styles.noDataSubtitle}>
              경북의 다른 시/군에서 다양한 다른 행사들을 찾아보세요.
            </div>
          </div>
        ) : (
          <div className={styles.noDataCard}>
            <div className={styles.noDataTitle}>
              지도에서 지역을 선택해주세요
            </div>
          </div>
        )}

        {festivals.length > 0 && (
          <button
            className={styles.loadMoreButton}
            onClick={() =>
              navigate("/festival-list", {
                state: { region: selectedRegion },
              })
            }
          >
            더보기
          </button>
        )}
      </div>
    </section>
  );
}
