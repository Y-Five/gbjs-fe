import { useCallback } from "react";
import styles from "./SealCard.module.css";

export default function SealCard({ seal, onClick }) {
  const handleClick = useCallback(() => {
    onClick?.(seal);
  }, [seal, onClick]);

  // 배지 번호에 따른 카드 상태 결정 (피그마 디자인 기준)
  const getCardStateClass = (seal) => {
    if (seal.badgeNumber === '01') return styles.collected;
    if (seal.badgeNumber === '02') return styles.rare;
    if (seal.badgeNumber === '03') return styles.special;
    return styles.uncollected;
  };
  
  // 배지 색상 결정
  const getBadgeColor = (badgeNumber) => {
    switch (badgeNumber) {
      case '01': return '#2d8ae7';
      case '02': return '#ff0f67';
      case '03': return '#00d2bd';
      default: return '#e8e8e8';
    }
  };

  // 테두리 색상 결정
  const getBorderColor = (badgeNumber) => {
    switch (badgeNumber) {
      case '01': return '#2d8ae7';
      case '02': return '#ff0f67';
      case '03': return '#00d2bd';
      default: return '#e8e8e8';
    }
  };

  return (
    <div 
      className={`${styles.card} ${getCardStateClass(seal)}`}
      style={{ borderColor: getBorderColor(seal.badgeNumber) }}
      onClick={handleClick}
    >
      {/* 번호 배지 */}
      <div 
        className={styles.numberBadge}
        style={{ backgroundColor: getBadgeColor(seal.badgeNumber) }}
      >
        <span className={styles.badgeNumber}>{seal.badgeNumber}</span>
      </div>

      {/* 캐릭터 이미지 */}
      <div className={styles.imageContainer}>
        {seal.image ? (
          <img 
            src={seal.image} 
            alt={seal.name}
            className={styles.image}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            style={{
              filter: !seal.isCollected ? 'grayscale(1) opacity(0.7)' : 'none'
            }}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span className={styles.placeholderText}>띠부씰</span>
          </div>
        )}
      </div>
      
      {/* 이름과 설명 */}
      <div className={styles.content}>
        <h3 className={styles.name}>{seal.name}</h3>
        <span className={styles.description}>{seal.region}</span>
      </div>
    </div>
  );
}