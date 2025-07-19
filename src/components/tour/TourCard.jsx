import styles from "./TourCard.module.css";

export default function TourCard({ tour, onClick, className = "" }) {
  return (
    <div
      className={`${styles.tourCard} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className={styles.tourImagePlaceholder}>
        {tour.imageUrl ? (
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className={styles.tourImage}
          />
        ) : (
          <div className={styles.placeholderContent}>
            <span className={styles.placeholderText}>{tour.name}</span>
          </div>
        )}
      </div>
      <div className={styles.tourInfo}>
        <div className={styles.tourHeader}>
          <h4 className={styles.tourName}>{tour.name}</h4>
          {tour.distance && (
            <span className={styles.tourDistance}>{tour.distance}km</span>
          )}
        </div>
        <div className={styles.tourTags}>
          {tour.tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
