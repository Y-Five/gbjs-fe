import styles from './SubmitSection.module.css';

export default function SubmitSection({ onSubmit, disabled }) {
  return (
    <div className={styles.bottomSection}>
      <button
        className={`${styles.submitButton} ${disabled ? styles.disabled : ''}`}
        onClick={onSubmit}
        disabled={disabled}
      >
        수정하기
      </button>
    </div>
  );
} 