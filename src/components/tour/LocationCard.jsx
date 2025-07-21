import { MdLocationOn } from "react-icons/md";
import styles from "./LocationCard.module.css";

export default function LocationCard({ location, userName = "나나나난님", className = "" }) {
  const formatLocation = () => {
    if (!location.loaded) {
      return "위치 정보 로딩 중...";
    }

    const { province, city } = location.address;

    if (city) {
      return province ? `${province} ${city}`.trim() : `${city}`.trim();
    }

    return "경상북도 경주시 인왕동";
  };

  return (
    <div className={`${styles.welcomeSection} ${className}`}>
      <div className={styles.welcomeCard}>
        <div className={styles.greeting}>
          <div className={styles.welcomeTitle}>
            <span className={styles.greetingText}>안녕하세요,</span>
            <span className={styles.nameText}>{userName}!</span>
          </div>
          <div className={styles.locationInfo}>
            <p className={styles.locationLabel}>현재 위치</p>
            <div className={styles.locationDisplay}>
              <MdLocationOn className={styles.locationIcon} />
              <span className={styles.locationText}>{formatLocation()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}