import SealCard from "./SealCard";
import styles from "./SealGrid.module.css";

export default function SealGrid({ seals, onSealClick }) {
  if (!seals || seals.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <img 
            src="/images/sealCharacter.png" 
            alt="empty" 
            className={styles.emptyIcon}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h3 className={styles.emptyTitle}>띠부씰이 없습니다</h3>
          <p className={styles.emptyDescription}>
            다른 필터 조건을 선택해보세요
          </p>
        </div>
      </div>
    );
  }

  // 수집 상태별로 분리
  const collectedSeals = seals.filter(seal => seal.isCollected);
  const uncollectedSeals = seals.filter(seal => !seal.isCollected);

  return (
    <div className={styles.container}>
      {/* 통계 정보 */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{seals.length}</span>
          <span className={styles.statLabel}>전체</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{collectedSeals.length}</span>
          <span className={styles.statLabel}>수집완료</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{uncollectedSeals.length}</span>
          <span className={styles.statLabel}>미수집</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>
            {seals.length > 0 ? Math.round((collectedSeals.length / seals.length) * 100) : 0}%
          </span>
          <span className={styles.statLabel}>수집률</span>
        </div>
      </div>

      {/* 수집완료 섹션 */}
      {collectedSeals.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>✓</span>
              수집완료 ({collectedSeals.length}개)
            </h3>
          </div>
          <div className={styles.grid}>
            {collectedSeals.map(seal => (
              <SealCard 
                key={seal.id}
                seal={seal}
                onClick={onSealClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* 미수집 섹션 */}
      {uncollectedSeals.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>○</span>
              미수집 ({uncollectedSeals.length}개)
            </h3>
          </div>
          <div className={styles.grid}>
            {uncollectedSeals.map(seal => (
              <SealCard 
                key={seal.id}
                seal={seal}
                onClick={onSealClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}