import styles from './SkeletonLoader.module.css';

// 기본 스켈레톤 컴포넌트
export const SkeletonBox = ({
  width,
  height,
  borderRadius = '4px',
  className = '',
}) => (
  <div
    className={`${styles.skeletonBox} ${className}`}
    style={{ width, height, borderRadius }}
  />
);

// 텍스트 스켈레톤
export const SkeletonText = ({ lines = 1, width = '100%', className = '' }) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBox
        key={index}
        width={index === lines - 1 ? '60%' : width}
        height="16px"
        className={styles.skeletonText}
      />
    ))}
  </div>
);

// 카드 스켈레톤
export const SkeletonCard = ({
  width = '100%',
  height = '200px',
  className = '',
}) => (
  <div
    className={`${styles.skeletonCard} ${className}`}
    style={{ width, height }}
  >
    <SkeletonBox width="100%" height="60%" borderRadius="8px 8px 0 0" />
    <div className={styles.skeletonCardContent}>
      <SkeletonText lines={2} width="80%" />
    </div>
  </div>
);

// 그리드 스켈레톤
export const SkeletonGrid = ({
  columns = 2,
  rows = 3,
  gap = '12px',
  cardWidth = '100%',
  cardHeight = '200px',
  className = '',
}) => (
  <div
    className={`${styles.skeletonGrid} ${className}`}
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }}
  >
    {Array.from({ length: columns * rows }).map((_, index) => (
      <SkeletonCard key={index} width={cardWidth} height={cardHeight} />
    ))}
  </div>
);

// 페이지 로딩 스켈레톤
export const PageSkeleton = () => (
  <div className={styles.pageSkeleton}>
    <SkeletonBox width="100%" height="60px" className={styles.headerSkeleton} />
    <div className={styles.contentSkeleton}>
      <SkeletonBox
        width="100%"
        height="120px"
        className={styles.bannerSkeleton}
      />
      <SkeletonGrid columns={2} rows={2} />
    </div>
  </div>
);

export default {
  SkeletonBox,
  SkeletonText,
  SkeletonCard,
  SkeletonGrid,
  PageSkeleton,
};
