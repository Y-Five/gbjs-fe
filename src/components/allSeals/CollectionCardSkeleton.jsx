import styles from '../../pages/AllSealsPage.module.css';

export default function CollectionCardSkeleton() {
  return (
    <div className={styles.collectionCard}>
      <div className={styles.skeletonCountNumber}></div>
      <div className={styles.collectionCount}>
        <div className={styles.skeletonCountNumber}></div>
        <span className={styles.countSeparator}>/</span>
        <div className={styles.skeletonCountTotal}></div>
      </div>
      <div className={styles.progressInfo}>
        <div className={styles.skeletonProgressRemaining}></div>
        <div className={styles.skeletonProgressRemaining}></div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.skeletonProgressFill}></div>
      </div>
    </div>
  );
}
