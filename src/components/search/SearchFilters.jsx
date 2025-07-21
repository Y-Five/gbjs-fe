import { useScrollGradient } from "../../hooks/useScrollGradient";
import { FILTER_OPTIONS } from "../../data/searchData";
import styles from "./SearchFilters.module.css";

export default function SearchFilters({ selectedFilter, onFilterChange }) {
  const { scrollRef, showLeftGradient, showRightGradient, checkScroll } = useScrollGradient();

  return (
    <div className={`${styles.filtersWrapper} ${showLeftGradient ? styles.showLeft : ''} ${showRightGradient ? styles.showRight : ''}`}>
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
              selectedFilter === filter.id ? styles.active : ""
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
    </div>
  );
}