import styles from '../../pages/AllSealsPage.module.css';

export default function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>띠부씰 정보를 불러오는 중...</p>
    </div>
  );
}
