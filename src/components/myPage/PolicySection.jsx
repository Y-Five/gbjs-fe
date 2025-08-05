import { useNavigate } from 'react-router-dom';
import styles from './PolicySection.module.css';

export default function PolicySection() {
  const navigate = useNavigate();
  
  const handlePolicyClick = (policyType) => {
    if (policyType === '계정 탈퇴') {
      navigate('/account-withdrawal');
    } else {
      // 다른 정책 페이지로 이동하는 로직 구현
      console.log(`${policyType} 정책 페이지로 이동`);
    }
  };

  return (
    <div className={styles.policySection}>
      <div className={styles.title}>이용정책</div>
      
      <button 
        className={styles.policyItem}
        onClick={() => handlePolicyClick('로그아웃')}
      >
        <span className={styles.policyLabel}>로그아웃</span>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M1.5 1L6.5 6L1.5 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button 
        className={styles.policyItem}
        onClick={() => handlePolicyClick('계정 탈퇴')}
      >
        <span className={styles.policyLabel}>계정 탈퇴</span>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M1.5 1L6.5 6L1.5 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
} 