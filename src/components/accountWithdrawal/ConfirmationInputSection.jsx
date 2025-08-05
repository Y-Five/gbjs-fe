import { useState, useEffect } from 'react';
import styles from './ConfirmationInputSection.module.css';

export default function ConfirmationInputSection({ onValidationChange }) {
  const [inputValue, setInputValue] = useState('');
  const [validationStatus, setValidationStatus] = useState(null); // null, 'match', 'mismatch'
  const confirmText = '회원탈퇴를 확인하였으며, 탈퇴합니다.';

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValidationStatus(null); // 타이핑 중에는 메시지 숨김
    onValidationChange(value === confirmText);
  };

  // 디바운싱: 입력을 멈춘 후 1초 뒤에 검증
  useEffect(() => {
    if (inputValue.trim() === '') {
      setValidationStatus(null);
      return;
    }

    const timer = setTimeout(() => {
      setValidationStatus(inputValue === confirmText ? 'match' : 'mismatch');
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, confirmText]);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>확인 문구 입력</h2>
      <p className={styles.description}>
        {confirmText}
      </p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.confirmInput}
          placeholder="확인문구를 입력해주세요."
          value={inputValue}
          onChange={handleInputChange}
        />
        {validationStatus && (
          <div className={`${styles.validationMessage} ${styles[validationStatus]}`}>
            {validationStatus === 'match' ? '확인 문구 입력 일치' : '확인 문구 입력 불일치'}
          </div>
        )}
      </div>
    </div>
  );
} 