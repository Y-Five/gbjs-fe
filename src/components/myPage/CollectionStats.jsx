import styles from './CollectionStats.module.css';

export default function CollectionStats({ collectedCount = 17, totalCount = 100 }) {
  const progressPercentage = (collectedCount / totalCount) * 100;
  const remainingCount = totalCount - collectedCount;

  return (
    <div className={styles.collectionStats}>
      <div className={styles.title}>띠부실 수집 현황</div>
      <div className={styles.countSection}>
        <span className={styles.count}>{collectedCount}</span>
        <span className={styles.unit}>개</span>
        <button className={styles.detailButton}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M1.5 1L6.5 6L1.5 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className={styles.progressContainer}>
        <div className={styles.progressLabelContainer}>
          <div className={styles.progressLabel}>띠부실 수집 완료까지</div>
          <div className={styles.progressText}>
            <span className={styles.countEmphasis}>{remainingCount}개</span> 남음
          </div>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
} 