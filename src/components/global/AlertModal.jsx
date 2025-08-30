import React from 'react';
import styles from './AlertModal.module.css';

const AlertModal = ({
  showModal,
  onClose,
  onConfirm,
  title,
  message,
  isError = false,
}) => {
  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.alertModal} ${isError ? styles.errorModal : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.alertContent}>
          {title && <h3 className={styles.alertTitle}>{title}</h3>}
          <p className={styles.alertText}>{message}</p>
          <div className={styles.alertDivider}></div>
          <button className={styles.alertButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
