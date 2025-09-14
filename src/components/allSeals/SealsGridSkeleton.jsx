import styles from '../../pages/AllSealsPage.module.css';

export default function SealsGridSkeleton() {
  // 3x3 그리드로 9개의 스켈레톤 카드 생성
  const skeletonCards = Array.from({ length: 9 }, (_, index) => (
    <div key={index} className={styles.sealCard}>
      <div className={styles.sealHeader}>
        <div className={styles.sealBadge}>
          <div className={styles.skeletonBadge}></div>
        </div>
        <div className={styles.skeletonSealName}></div>
      </div>
      <div className={styles.sealImageWrapper}>
        <div className={styles.skeletonSealImage}></div>
      </div>
      <div className={styles.sealLocation}>
        <div className={styles.skeletonLocation}></div>
      </div>
    </div>
  ));

  return (
    <div className={styles.gridContainer}>
      <div className={styles.sealsGrid}>{skeletonCards}</div>
    </div>
  );
}
