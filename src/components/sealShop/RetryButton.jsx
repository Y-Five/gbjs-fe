import React from 'react';
import styles from '../../pages/SealShopPage.module.css';

const RetryButton = ({ onRetry, isLoading }) => {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorIcon}>⚠️</div>
      <p className={styles.errorMessage}>상품을 불러오는데 실패했습니다</p>
      <button
        className={styles.retryButton}
        onClick={onRetry}
        disabled={isLoading}
      >
        {isLoading ? '불러오는 중...' : '다시 불러오기'}
      </button>
    </div>
  );
};

export default RetryButton;
