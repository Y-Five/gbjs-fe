import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({
  message,
  type = 'error',
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose?.();
        }, 300); // 애니메이션 완료 후 onClose 호출
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        isVisible ? styles.visible : ''
      }`}
    >
      <div className={styles.toastContent}>
        <span className={styles.toastMessage}>{message}</span>
        <button
          className={styles.closeButton}
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
