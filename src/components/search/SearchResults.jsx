import styles from "./SearchResults.module.css";

export default function SearchResults({ results, onResultClick }) {
  return (
    <div className={styles.resultsContainer} role="list" aria-label="검색 결과">
      {results.map((result) => (
        <div
          key={result.id}
          className={styles.resultCard}
          onClick={() => onResultClick?.(result)}
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onResultClick?.(result);
            }
          }}
          aria-label={`${result.name}, ${result.location}, ${result.description}`}
        >
          <div className={styles.resultImage}>
            {result.imageUrl ? (
              <img src={result.imageUrl} alt={`${result.name} 이미지`} />
            ) : (
              <div className={styles.imagePlaceholder} role="img" aria-label={`${result.name} 이미지 없음`}>
                <span className={styles.placeholderText} aria-hidden="true">{result.name}</span>
              </div>
            )}
          </div>
          
          <div className={styles.resultInfo}>
            <div className={styles.titleRow}>
              <h3 className={styles.resultName} aria-level="3">{result.name}</h3>
              <span className={styles.resultLocation} aria-label="위치">{result.location}</span>
            </div>
            <p className={styles.resultDescription}>{result.description}</p>
            <div className={styles.resultTags}>
              {result.tags.map((tag, index) => (
                <span key={index}>#{tag} </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}