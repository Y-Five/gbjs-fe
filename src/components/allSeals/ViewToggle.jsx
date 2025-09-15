import styles from '../../pages/AllSealsPage.module.css';

export default function ViewToggle({ showUserSeals, onViewToggle }) {
  return (
    <div className={styles.viewToggle}>
      <button
        className={`${styles.toggleButton} ${
          !showUserSeals ? styles.active : ''
        }`}
        onClick={() => onViewToggle(false)}
      >
        전체 띠부씰
      </button>
      <button
        className={`${styles.toggleButton} ${
          showUserSeals ? styles.active : ''
        }`}
        onClick={() => onViewToggle(true)}
      >
        내 수집품
      </button>
    </div>
  );
}
