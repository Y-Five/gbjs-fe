import styles from "./CourseCardSection.module.css";

export default function CourseCardSection({
  title,
  sub,
  tabs = [],
  cards = [],
  loading = false,
  error = null,
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

      <div className={styles.cardContainer}>
        {loading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : error ? (
          <div className={styles.error}>데이터를 불러올 수 없습니다.</div>
        ) : cards.length === 0 ? (
          <div className={styles.noData}>데이터가 없습니다.</div>
        ) : (
          cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className={styles.description}>
                <p className={styles.name}>{card.name}</p>
                <p className={styles.location}>{card.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
