import React from 'react';
import styles from './SealCard.module.css';
import magpieImage from '../../assets/images/magpie.png';

const SealCard = ({
  seal,
  onClick,
  className = '',
  isFlipped = false,
  isSorting = false,
  noBorderRadius = false,
  noBorder = false,
  size = 'medium',
  skeleton = false,
  imageOnly = true,
}) => {
  // 색상 유틸리티 함수들
  const getRarityColor = (rarity) => {
    const colors = {
      BLUE: 'var(--rarity-blue)',
      GREEN: 'var(--rarity-green)',
      RED: 'var(--rarity-red)',
    };
    return colors[rarity] || colors.BLUE;
  };

  const getSealBorderColor = (seal) => {
    return seal.collected ? getRarityColor(seal.rarity) : '#e8e8e8';
  };

  const getSealBadgeColor = (seal) => {
    return seal.collected ? getRarityColor(seal.rarity) : '#e8e8e8';
  };

  const getSealImage = (seal) => {
    return seal.frontImageUrl?.trim() || magpieImage;
  };

  if (skeleton) {
    return (
      <div
        className={`${styles.sealCard} ${styles.skeleton} ${styles[size]} ${className}`}
      >
        <div className={styles.sealHeader}>
          <div className={`${styles.sealBadge} ${styles.skeletonBadge}`}>
            <div className={styles.skeletonBadgeNumber}></div>
          </div>
          <div className={`${styles.sealName} ${styles.skeletonText}`}></div>
        </div>
        <div className={styles.sealImageWrapper}>
          <div className={styles.skeletonImage}></div>
        </div>
        <div className={`${styles.sealLocation} ${styles.skeletonText}`}></div>
      </div>
    );
  }

  if (imageOnly) {
    return (
      <div
        className={`${styles.sealCard} ${styles.imageOnly} ${
          seal.collected ? styles.collected : styles.uncollected
        } ${isSorting ? styles.sorting : ''} ${
          isFlipped ? styles.flipped : ''
        } ${noBorderRadius ? styles.noBorderRadius : ''} ${
          noBorder ? styles.noBorder : ''
        } ${styles[size]} ${className}`}
        onClick={onClick}
      >
        <img
          src={getSealImage(seal)}
          alt={seal.spotName}
          className={styles.sealImageOnly}
          onError={(e) => {
            e.target.src = magpieImage;
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.sealCard} ${
        seal.collected ? styles.collected : styles.uncollected
      } ${isSorting ? styles.sorting : ''} ${isFlipped ? styles.flipped : ''} ${
        noBorderRadius ? styles.noBorderRadius : ''
      } ${noBorder ? styles.noBorder : ''} ${styles[size]} ${className}`}
      style={{
        borderColor: noBorder ? 'transparent' : getSealBorderColor(seal),
      }}
      onClick={onClick}
    >
      <div className={styles.sealHeader}>
        <div
          className={styles.sealBadge}
          style={{ backgroundColor: getSealBadgeColor(seal) }}
        >
          <span className={styles.badgeNumber}>
            {String(seal.number).padStart(2, '0')}
          </span>
        </div>
        <div className={styles.sealName}>{seal.spotName}</div>
      </div>
      <div className={styles.sealImageWrapper}>
        <img
          src={getSealImage(seal)}
          alt={seal.spotName}
          className={styles.sealImage}
          onError={(e) => {
            e.target.src = magpieImage;
          }}
        />
      </div>
      <div className={styles.sealLocation}>{seal.locationName}</div>
    </div>
  );
};

export default SealCard;
