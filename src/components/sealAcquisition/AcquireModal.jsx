import styles from '../../pages/SealAcquisitionPage.module.css';
import { SealCard } from '../global';

const AcquireModal = ({
  showModal,
  selectedSticker,
  onClose,
  onAcquire,
  acquiring,
  acquireSuccess,
}) => {
  if (!showModal || !selectedSticker) return null;

  const getButtonContent = () => {
    if (acquiring) {
      return (
        <div className={styles.buttonContent}>
          <span>획득 중...</span>
        </div>
      );
    }

    if (acquireSuccess) {
      return (
        <div className={styles.buttonContent}>
          <span>획득 성공!</span>
        </div>
      );
    }

    return '획득하기';
  };

  const getButtonClassName = () => {
    let className = styles.modalAcquireButton;

    if (acquiring) {
      className += ` ${styles.acquiring}`;
    }

    if (acquireSuccess) {
      className += ` ${styles.success}`;
    }

    return className;
  };

  const getModalCardClassName = () => {
    let className = styles.modalCard;

    if (acquiring) {
      className += ` ${styles.rotating}`;
    }

    if (acquireSuccess) {
      className += ` ${styles.filled}`;
    }

    return className;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={getModalCardClassName()}>
          <div className={styles.modalSealCardWrapper}>
            <SealCard
              seal={{
                id: selectedSticker.sealId,
                number: selectedSticker.number,
                spotName: selectedSticker.spot_name,
                locationName: selectedSticker.location_name,
                rarity: selectedSticker.rarity,
                frontImageUrl: selectedSticker.frontImageUrl,
              }}
              noBorderRadius={true}
              noBorder={true}
              size="large"
            />
          </div>
        </div>
        <div className={styles.modalButtonWrapper}>
          <button className={getButtonClassName()} onClick={onAcquire}>
            {getButtonContent()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcquireModal;
