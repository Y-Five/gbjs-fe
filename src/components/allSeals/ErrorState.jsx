import styles from '../../pages/AllSealsPage.module.css';

export default function ErrorState({ error, onBackClick }) {
  return (
    <div className={styles.errorContainer}>
      <p>{error}</p>
      <button onClick={onBackClick} className={styles.backButton}>
        돌아가기
      </button>
    </div>
  );
}
