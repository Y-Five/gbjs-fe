import { useNavigate } from 'react-router-dom';
import styles from './AccountInfo.module.css';

export default function AccountInfo({ 
  nickname = "나나난", 
  email = "heritage@example.com",
  message = "소셜 로그인 연동 계정"
}) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/account-edit');
  };
  return (
    <div className={styles.accountInfo}>
      <div className={styles.title}>계정정보</div>
      
      <div className={styles.infoItem}>
        <div className={styles.label}>닉네임</div>
        <div className={styles.valueSection}>
          <span className={styles.value}>{nickname}</span>
          <button className={styles.editButton} onClick={handleEditClick}>수정</button>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.label}>이메일</div>
          <span className={styles.value}>{email}</span>
          <div className={styles.message}>{message}</div>
      </div>

      <div className={styles.loginSection}>
        <div className={styles.label}>로그인 방식</div>
        <div className={styles.loginButtons}>
          <button className={styles.activeLogin}>카카오</button>
          <p className={styles.inactiveLogin}>연동됨</p>
        </div>
      </div>
    </div>
  );
} 