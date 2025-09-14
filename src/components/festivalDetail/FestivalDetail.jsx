import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./FestivalDetail.module.css";
import { festivalService } from "../../apis/main";
import MapIcon from "../../assets/images/main/mapIcon.png";

export default function FestivalDetail() {
  const { contentid } = useParams();
  const navigate = useNavigate();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // 축제 상세 정보 가져오기
  useEffect(() => {
    const fetchFestivalDetail = async () => {
      if (!contentid) return;

      setLoading(true);
      setError(null);

      try {
        const data = await festivalService.getFestivalDetail(contentid);
        setFestival(data.data);
      } catch (err) {
        setError(err.message || "축제 정보를 가져올 수 없습니다.");
        console.error("축제 상세 정보 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivalDetail();
  }, [contentid]);

  // 뒤로가기
  const handleBack = () => {
    navigate(-1);
  };

  // 카카오맵으로 위치 보기
  const handleMapClick = () => {
    if (festival?.addr1) {
      const encodedAddr = encodeURIComponent(festival.addr1);
      window.open(`https://map.kakao.com/link/search/${encodedAddr}`, "_blank");
    }
  };

  // 웹사이트 열기
  const handleWebsiteClick = () => {
    if (festival?.homepage) {
      window.open(festival.homepage, "_blank");
    }
  };

  // 전화걸기
  const handleCallClick = () => {
    if (festival?.tel) {
      window.location.href = `tel:${festival.tel}`;
    }
  };

  // 본문 확장/축소 토글
  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>축제 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error || !festival) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>축제 정보를 가져올 수 없습니다</div>
        <button onClick={handleBack} className={styles.backButton}>
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.closeButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>{festival.title}</h1>
          <p className={styles.headerSubtitle}>행사 상세보기</p>
        </div>
      </div>

      {/* 메인 이미지 */}
      <div className={styles.mainImage}>
        <img
          src={festival.firstimage}
          alt={festival.title}
          className={styles.image}
        />
      </div>

      {/* 상세 정보 카드 */}
      <div className={styles.detailCard}>
        {/* 카카오맵 버튼 */}
        <button onClick={handleMapClick} className={styles.mapButton}>
          <img src={MapIcon} className={styles.mapIcon} alt="mapIcon" />
          <span>카카오맵으로 상세위치 보기</span>
        </button>

        {/* 축제 제목 */}
        <h2 className={styles.festivalTitle}>{festival.title}</h2>

        {/* 축제 기간 */}
        <p className={styles.festivalDate}>
          {formatDate(festival.eventstartdate)} ~{" "}
          {formatDate(festival.eventenddate)}
        </p>

        {/* 축제 설명 */}
        <div className={styles.descriptionContainer}>
          <div
            className={`${styles.description} ${
              !isExpanded ? styles.collapsed : ""
            }`}
          >
            {festival.overview || "축제에 대한 상세 정보가 없습니다."}
          </div>
          <button
            onClick={handleToggleDescription}
            className={styles.toggleButton}
          >
            {isExpanded ? "줄이기" : "더보기"}
          </button>
        </div>

        {/* 구분선 */}
        <div className={styles.divider}></div>

        {/* 주소 */}
        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className={styles.infoContent}>
            <span className={styles.infoValue}>{festival.addr1}</span>
          </div>
        </div>

        {/* 전화번호 */}
        {festival.tel && (
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button onClick={handleCallClick} className={styles.infoContent}>
              <span className={styles.infoValue}>{festival.tel}</span>
            </button>
          </div>
        )}

        {/* 웹사이트 */}
        {festival.homepage && (
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <button onClick={handleWebsiteClick} className={styles.infoContent}>
              <span className={styles.infoValue}>{festival.homepage}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 날짜 포맷팅 함수 (YYYYMMDD -> YYYY년 MM월 DD일)
const formatDate = (dateString) => {
  if (!dateString || dateString.length !== 8) return dateString;
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};
