import styles from './WithdrawalSubmitSection.module.css';

export default function WithdrawalSubmitSection({ onSubmit, disabled }) {
  return (
    <div className={styles.bottomSection}>
      <button
        className={`${styles.submitButton} ${disabled ? styles.disabled : ''}`}
        onClick={onSubmit}
        disabled={disabled}
      >
        탈퇴하기
      </button>
    </div>
  );
} 