import styles from "./CourseCardSection.module.css";

export default function CourseCardSection({
  title,
  sub,
  tabs = [],
  cards = [],
  loading = false,
  error = null,
  onCardClick,
  onRetry,
}) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>{sub}</p>

      {tabs.length > 0 && (
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${index === 0 ? styles.active : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {error ? (
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>{error}</div>
          {onRetry && (
            <button className={styles.retryButton} onClick={onRetry}>
              다시 불러오기
            </button>
          )}
        </div>
      ) : (
        <div className={styles.cardContainer}>
          {loading ? (
            <div className={styles.skeletonContainer}>
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonDescription}>
                    <div className={styles.skeletonName}></div>
                    <div className={styles.skeletonLocation}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : cards.length === 0 ? (
            <div className={styles.noData}>데이터가 없습니다.</div>
          ) : (
            cards.map((card, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => onCardClick?.(card)}
              >
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className={styles.description}>
                  <p className={styles.name}>{card.name}</p>
                  <p className={styles.location}>{card.location}</p>
                  {card.locationName && (
                    <p className={styles.locationName}>{card.locationName}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
