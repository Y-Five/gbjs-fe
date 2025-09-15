import styles from '../../pages/AllSealsPage.module.css';

export default function CollectionCard({ totalCount, collectedCount }) {
  return (
    <div className={styles.collectionCard}>
      <h3 className={styles.collectionTitle}>경북씰 수집 현황</h3>
      <div className={styles.collectionCount}>
        <span className={styles.countNumber}>{collectedCount}</span>
        <span className={styles.countSeparator}>/</span>
        <span className={styles.countTotal}>{totalCount}</span>
      </div>
      <div className={styles.progressInfo}>
        <span className={styles.progressLabel}>경북씰 수집 완료까지</span>
        <span className={styles.progressRemaining}>
          <span className={styles.remainingNumber}>
            {totalCount - collectedCount}개
          </span>{' '}
          남음
        </span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${(collectedCount / totalCount) * 100}%` }}
        />
      </div>
    </div>
  );
}
