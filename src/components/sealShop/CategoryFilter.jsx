import styles from "./CategoryFilter.module.css";

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.filterList}>
        {categories.map(category => (
          <button 
            key={category}
            className={`${styles.filterButton} ${selected === category ? styles.active : ''}`}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}