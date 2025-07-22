import { useCallback } from "react";
import MapIcon from "../../assets/icons/MapIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import CallIcon from "../../assets/icons/CallIcon";
import styles from "./InfoCard.module.css";

const KAKAO_MAP_URL = "https://map.kakao.com/link/search/";

export default function InfoCard({ placeData }) {
  const handleMapClick = useCallback(() => {
    const mapUrl = `${KAKAO_MAP_URL}${encodeURIComponent(placeData.name)}`;
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  }, [placeData.name]);

  const formatTags = (tags) => {
    if (!tags || tags.length === 0) return "";
    return `#${tags.join(", #")}`;
  };

  return (
    <div className={styles.infoCard}>
      <button 
        className={styles.mapButton} 
        onClick={handleMapClick}
        aria-label="카카오맵에서 위치 보기"
      >
        <MapIcon />
        <span>카카오맵으로 상세위치 보기</span>
      </button>

      <h1 className={styles.title}>{placeData.name}</h1>
      {placeData.tags && (
        <p className={styles.tags}>{formatTags(placeData.tags)}</p>
      )}

      <p className={styles.description}>
        {placeData.description}
      </p>

      <div className={styles.divider} />

      <div className={styles.infoItem}>
        <div className={styles.icon}>
          <LocationIcon />
        </div>
        <span className={styles.address}>{placeData.address}</span>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.icon}>
          <ClockIcon />
        </div>
        <div className={styles.timeInfo}>
          <span className={styles.day}>매일</span>
          <span className={styles.dot} />
          <span className={styles.hours}>{placeData.openTime}</span>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.icon}>
          <CallIcon />
        </div>
        <span className={styles.phone}>{placeData.phoneNumber}</span>
      </div>
    </div>
  );
}