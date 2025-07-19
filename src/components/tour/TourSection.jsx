import TourCard from "./TourCard";
import styles from "./TourSection.module.css";

export default function TourSection({
  tourData,
  title = "관광지 음성 가이드",
  description = "경주의 주요 관광지를 둘러보세요",
  onTourClick,
  className = "",
}) {
  return (
    <div className={`${styles.tourSection} ${className}`}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      <div className={styles.tourCards}>
        {tourData.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onClick={() => onTourClick?.(tour)}
          />
        ))}
      </div>
    </div>
  );
}
