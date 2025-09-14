import { memo } from 'react';
import { MicBadge, TtsBadge } from '../global';
import styles from './SearchResults.module.css';

const SearchResults = memo(function SearchResults({
  results,
  onResultClick,
  lastElementRef,
  loading,
  hasMore,
}) {
  const safeResults = Array.isArray(results) ? results : [];

  return (
    <div className={styles.resultsContainer} role="list" aria-label="검색 결과">
      {safeResults.length > 0
        ? safeResults.map((result, index) => {
            const isLastElement = index === safeResults.length - 4;

            return (
              <div
                key={`${result.contentId || result.id || index}-${index}`}
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
                aria-label={`${result.title}, ${result.distance}km, ${result.addr1}`}
                ref={isLastElement ? lastElementRef : null}
              >
                <div className={styles.resultImage}>
                  {result.firstimage ? (
                    <img
                      src={result.firstimage}
                      alt={`${result.title} 이미지`}
                    />
                  ) : (
                    <div
                      className={styles.imagePlaceholder}
                      role="img"
                      aria-label={`${result.title} 이미지 없음`}
                    >
                      <span
                        className={styles.placeholderText}
                        aria-hidden="true"
                      >
                        {result.title}
                      </span>
                    </div>
                  )}
                  {result.ttsExist && <MicBadge />}
                </div>
                <div className={styles.resultInfo}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.resultName} aria-level="3">
                      {result.title}
                    </h3>
                    <span className={styles.resultLocation} aria-label="거리">
                      {result.distance ? `${result.distance.toFixed(1)}km` : ''}
                    </span>
                  </div>
                  <p className={styles.resultDescription}>{result.addr1}</p>
                  <div className={styles.resultTags}>
                    <span>#{result.type}</span>
                    {result.ttsExist && <TtsBadge />}
                  </div>
                </div>
              </div>
            );
          })
        : null}
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>
            {safeResults.length === 0
              ? '검색 중...'
              : '더 많은 장소를 불러오는 중...'}
          </p>
        </div>
      )}
      {!loading && !hasMore && safeResults.length > 0 && (
        <div className={styles.noMoreData}>
          <p>모든 장소를 불러왔습니다.</p>
        </div>
      )}
      {!loading && safeResults.length === 0 && (
        <div className={styles.noResults}>
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
});

export default SearchResults;
