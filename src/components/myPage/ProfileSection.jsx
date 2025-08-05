import styles from './ProfileSection.module.css';

export default function ProfileSection({ userName = "나나난님" }) {
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileImage}>
        <div className={styles.avatar}>
          <div className={styles.avatarIcon}></div>
        </div>
        <button className={styles.cameraButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className={styles.greeting}>오늘도 반갑습니다!</div>
      <div className={styles.userName}>{userName}</div>
    </div>
  );
} 