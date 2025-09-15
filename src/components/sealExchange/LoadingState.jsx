import React from 'react';
import BackHeader from '../header/BackHeader';
import styles from '../../pages/SealExchangePage.module.css';

const LoadingState = () => {
  return (
    <div className={styles.page}>
      <BackHeader title="상품 교환" />
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>상품 정보를 불러오는 중...</p>
      </div>
    </div>
  );
};

export default LoadingState;
