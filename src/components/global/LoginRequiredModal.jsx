import React from 'react';
import styles from './LoginRequiredModal.module.css';

const LoginRequiredModal = ({ showModal, onClose, onLogin }) => {
  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalCard}>
          <div className={styles.modalText}>
            로그인이 필요한 서비스 입니다.
          </div>
          <div className={styles.modalDivider}></div>
          <button className={styles.modalButton} onClick={onLogin}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
