import styles from "./SealFilters.module.css";

export default function SealFilters({ 
  filters, 
  onFilterChange, 
  categories, 
  regions, 
  difficultyLevels,
  collectionStatus 
}) {
  
  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...filters, [filterType]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>카테고리</h4>
        <div className={styles.filterButtons}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                filters.category === category ? styles.active : ''
              }`}
              onClick={() => handleFilterChange('category', category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>지역</h4>
        <div className={styles.filterButtons}>
          {regions.map(region => (
            <button
              key={region}
              className={`${styles.filterButton} ${
                filters.region === region ? styles.active : ''
              }`}
              onClick={() => handleFilterChange('region', region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>난이도</h4>
        <div className={styles.filterButtons}>
          {difficultyLevels.map(difficulty => (
            <button
              key={difficulty}
              className={`${styles.filterButton} ${
                filters.difficulty === difficulty ? styles.active : ''
              }`}
              onClick={() => handleFilterChange('difficulty', difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>수집상태</h4>
        <div className={styles.filterButtons}>
          {collectionStatus.map(status => (
            <button
              key={status}
              className={`${styles.filterButton} ${
                filters.status === status ? styles.active : ''
              }`}
              onClick={() => handleFilterChange('status', status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 초기화 버튼 */}
      <div className={styles.resetSection}>
        <button
          className={styles.resetButton}
          onClick={() => onFilterChange({
            category: "전체",
            region: "전체", 
            difficulty: "전체",
            status: "전체"
          })}
        >
          🔄 필터 초기화
        </button>
      </div>
    </div>
  );
}