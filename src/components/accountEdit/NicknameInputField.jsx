import { useState } from 'react';
import styles from './NicknameInputField.module.css';

export default function NicknameInputField({ value, onChange, onValidationChange }) {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // 'available', 'duplicate', null

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setCheckResult(null);
    onValidationChange(false);
  };

  const handleDuplicateCheck = async () => {
    if (!value.trim()) return;
    
    setIsChecking(true);
    // 실제로는 API 호출이 필요합니다
    // 임시로 랜덤하게 성공/실패 결정 (나중에 실제 API로 교체)
    setTimeout(() => {
      const isDuplicate = Math.random() < 0.3; // 30% 확률로 중복
      
      if (isDuplicate) {
        setCheckResult('duplicate');
        onValidationChange(false);
      } else {
        setCheckResult('available');
        onValidationChange(true);
      }
      
      setIsChecking(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>변경 닉네임</label>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.nicknameInput}
            placeholder="변경 닉네임을 입력하세요."
            value={value}
            onChange={handleInputChange}
            maxLength={20}
          />
          <button
            className={styles.duplicateButton}
            onClick={handleDuplicateCheck}
            disabled={!value.trim() || isChecking}
          >
            {isChecking ? '확인중...' : '중복확인'}
          </button>
        </div>
      </div>
      {checkResult && (
        <div className={`${styles.checkMessage} ${checkResult === 'duplicate' ? styles.errorMessage : styles.successMessage}`}>
          {checkResult === 'available' ? '사용 가능한 닉네임입니다.' : '이미 존재하는 닉네임입니다.'}
        </div>
      )}
    </div>
  );
} 