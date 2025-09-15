import React from 'react';
import BackHeader from '../header/BackHeader';
import styles from '../../pages/SealExchangePage.module.css';

const ErrorState = ({ error, onBackClick }) => {
  return (
    <div className={styles.page}>
      <BackHeader title="상품 교환" />
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={onBackClick} className={styles.backButton}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
