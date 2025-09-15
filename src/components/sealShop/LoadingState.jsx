import React from 'react';
import Header from '../header/Header';
import styles from '../../pages/SealShopPage.module.css';

const LoadingState = () => {
  return (
    <div className={styles.page}>
      <Header title="경북씰 상품" isDark={true} />
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>로딩 중...</p>
      </div>
    </div>
  );
};

export default LoadingState;
