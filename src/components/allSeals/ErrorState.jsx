import styles from '../../pages/AllSealsPage.module.css';

export default function ErrorState({ error, onBackClick, onRetry, isLoading }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <p className={styles.errorMessage}>{error}</p>
      <div className={styles.errorButtonGroup}>
        <button
          onClick={onRetry}
          className={styles.retryButton}
          disabled={isLoading}
        >
          {isLoading ? '불러오는 중...' : '다시 불러오기'}
        </button>
        <button onClick={onBackClick} className={styles.backButton}>
          돌아가기
        </button>
      </div>
    </div>
  );
}
