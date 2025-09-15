import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import GyeongbukMap from "../components/regionMap/GyeongbukMap";
import { festivalService } from "../apis/main";
import styles from "./FestivalListPage.module.css";

export default function FestivalListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { region } = location.state || { region: "경주시" };

  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(region);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef();

  // 축제 데이터 가져오기
  const fetchFestivals = async (
    page = 1,
    reset = false,
    targetRegion = selectedRegion
  ) => {
    if (reset) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const data = await festivalService.getFestivals(targetRegion, page, 10);
      const newFestivals = data.data?.content || [];

      if (reset) {
        setFestivals(newFestivals);
      } else {
        setFestivals((prev) => [...prev, ...newFestivals]);
      }

      setHasMore(!data.data?.last);
    } catch (err) {
      setError(err.message || "축제 정보를 가져올 수 없습니다.");
      console.error("축제 데이터 조회 실패:", err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchFestivals(1, true, selectedRegion);
  }, [selectedRegion]);

  // 지도에서 지역 선택 시 축제 데이터 가져오기
  const handleRegionSelect = (regionName) => {
    setSelectedRegion(regionName);
    setPageNum(1);
    setHasMore(true);
    fetchFestivals(1, true, regionName);
  };

  // 무한스크롤을 위한 더보기 함수
  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore && !loading) {
      const nextPage = pageNum + 1;
      setPageNum(nextPage);
      fetchFestivals(nextPage, false);
    }
  }, [hasMore, isLoadingMore, loading, pageNum]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore]);

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
    <>
      <BackHeader title="행사 전체보기" />
      <div className={styles.main}>
        <div className={styles.map}>
          <GyeongbukMap
            onSelect={handleRegionSelect}
            defaultSelected={[selectedRegion]}
          />
        </div>

        <div className={styles.countSection}>
          <span className={styles.countText}>
            총 <span className={styles.countNumber}>{festivals.length}</span>건
          </span>
        </div>

        <div className={styles.festivalList}>
          {loading && festivals.length === 0 ? (
            <div className={styles.loading}>축제 정보를 불러오는 중...</div>
          ) : error ? (
            <div className={styles.error}>축제 정보를 가져올 수 없습니다</div>
          ) : festivals.length > 0 ? (
            festivals.map((festival, index) => (
              <div
                key={festival.contentid || index}
                className={styles.festivalCard}
                onClick={() => handleFestivalClick(festival.contentid)}
              >
                <img
                  src={festival.firstimage}
                  alt={festival.title || "축제 이미지"}
                  className={styles.festivalImage}
                />
                <div className={styles.festivalInfo}>
                  <p className={styles.festivalLocation}>
                    {festival.addr1 || "위치 정보 없음"}
                  </p>
                  <p className={styles.festivalTitle}>
                    {festival.title || "축제명 없음"}
                  </p>
                  <p className={styles.festivalDate}>
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
        </div>

        {/* 무한스크롤 트리거 요소 */}
        {hasMore && festivals.length > 0 && (
          <div ref={observerRef} className={styles.scrollTrigger}>
            {isLoadingMore && (
              <div className={styles.loadingMore}>
                더 많은 축제를 불러오는 중...
              </div>
            )}
          </div>
        )}

        {/* 더 이상 로드할 데이터가 없을 때 */}
        {!hasMore && festivals.length > 0 && (
          <div className={styles.noMoreData}>모든 축제를 불러왔습니다.</div>
        )}
      </div>
    </>
  );
}
