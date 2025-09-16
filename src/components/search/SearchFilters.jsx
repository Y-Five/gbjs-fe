import { useEffect } from 'react';
import { useScrollGradient } from '../../hooks/useScrollGradient';
import { FILTER_OPTIONS } from '../../constants/searchConstants';
import styles from './SearchFilters.module.css';

export default function SearchFilters({ selectedFilter, onFilterChange }) {
  const { scrollRef, showLeftGradient, showRightGradient, checkScroll } =
    useScrollGradient();

  // 컴포넌트 마운트 후 스크롤 상태 확인
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScroll();
    }, 200);

    return () => clearTimeout(timer);
  }, [checkScroll]);

  return (
    <div className={styles.filtersWrapper}>
      <div
        ref={scrollRef}
        className={styles.filtersContainer}
        onScroll={checkScroll}
        role="tablist"
        aria-label="검색 필터"
      >
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filterButton} ${
              selectedFilter === filter.id ? styles.active : ''
            }`}
            onClick={() => onFilterChange(filter.id)}
            role="tab"
            aria-selected={selectedFilter === filter.id}
            aria-label={`${filter.label} 필터`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {showLeftGradient && <div className={styles.leftGradient} />}
      {showRightGradient && <div className={styles.rightGradient} />}
    </div>
  );
}
