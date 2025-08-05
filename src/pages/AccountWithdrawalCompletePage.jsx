import { useNavigate } from 'react-router-dom';
import styles from './AccountWithdrawalCompletePage.module.css';

export default function AccountWithdrawalCompletePage() {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <div className={styles.completePage}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <div className={styles.iconCircle}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={styles.trashIcon}>
              <path 
                d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19ZM10 11V17M14 11V17" 
                stroke="#fff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        <h1 className={styles.title}>계정 탈퇴 완료</h1>
        <p className={styles.description}>탈퇴가 완료되었습니다.</p>
      </div>

      <div className={styles.bottomSection}>
        <button className={styles.mainButton} onClick={handleGoToMain}>
          메인으로
        </button>
      </div>
    </div>
  );
} 