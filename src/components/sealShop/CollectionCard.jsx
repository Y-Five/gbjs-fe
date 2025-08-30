import React, { forwardRef } from 'react';
import styles from '../../pages/SealShopPage.module.css';

const CollectionCard = forwardRef(
  (
    {
      collectedSeals,
      totalSeals,
      onAllSealsClick,
      onShopButtonClick,
      isLoggedIn,
    },
    ref
  ) => {
    const progressPercentage =
      totalSeals > 0 ? (collectedSeals / totalSeals) * 100 : 0;
    const remainingSeals = totalSeals - collectedSeals;

    return (
      <div
        className={`${styles.collectionCard} ${
          !isLoggedIn ? styles.blurred : ''
        }`}
        ref={ref}
      >
        {!isLoggedIn && (
          <div className={styles.loginOverlay}>
            <div className={styles.loginMessage}>
              <p className={styles.loginText}>로그인이 필요한 서비스입니다.</p>
              <div className={styles.loginButtonGroup}>
                <button
                  className={styles.loginButton}
                  onClick={onShopButtonClick}
                >
                  로그인하러가기
                </button>
                <button
                  className={styles.allSealsButton}
                  onClick={onAllSealsClick}
                >
                  전체 띠부씰 보기
                </button>
              </div>
            </div>
          </div>
        )}

        <h3 className={styles.collectionTitle}>띠부씰 수집 현황</h3>

        <div className={styles.collectionCount}>
          <span className={styles.countNumber}>{collectedSeals}</span>
          <span className={styles.countUnit}>개</span>
        </div>

        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>띠부씰 수집 완료까지</span>
          <span className={styles.progressRemaining}>
            {remainingSeals}개 남음
          </span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.shopButton} onClick={onShopButtonClick}>
            띠부씰 상품 보기
          </button>
          <button className={styles.allSealsButton} onClick={onAllSealsClick}>
            전체 띠부씰 보기
          </button>
        </div>
      </div>
    );
  }
);

CollectionCard.displayName = 'CollectionCard';

export default CollectionCard;
