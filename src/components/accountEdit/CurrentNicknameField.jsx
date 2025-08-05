import styles from './CurrentNicknameField.module.css';

export default function CurrentNicknameField({ nickname }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>현재 닉네임</label>
      <div className={styles.currentNickname}>{nickname}</div>
    </div>
  );
} 