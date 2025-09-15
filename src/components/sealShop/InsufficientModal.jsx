import styles from '../../pages/SealShopPage.module.css';

const InsufficientModal = ({
  showModal,
  selectedProduct,
  collectedSeals,
  onClose,
}) => {
  if (!showModal || !selectedProduct) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.insufficientModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>스티커가 부족합니다</h3>
          <p className={styles.modalMessage}>
            <span className={styles.productName}>{selectedProduct.name}</span>
            을(를) 교환하려면
            <br />
            <span className={styles.requiredCount}>
              {selectedProduct.price}개의 스티커
            </span>
            가 필요합니다.
          </p>
          <div className={styles.sealCountInfo}>
            <span>현재 보유: {collectedSeals}개</span>
            <span className={styles.insufficient}>
              부족: {selectedProduct.price - collectedSeals}개
            </span>
          </div>
          <button className={styles.modalButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientModal;
