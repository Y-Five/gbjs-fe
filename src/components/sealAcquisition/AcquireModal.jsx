import { useState } from 'react';
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

  const isCollected = selectedSticker.collected;
  const [isFlipped, setIsFlipped] = useState(false);

  const getButtonContent = () => {
    if (isCollected) {
      return '띠부씰을 눌러 까치가 지어준 시를 확인해보세요!';
    }

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
          <span>🎉 획득 성공! 🎉</span>
        </div>
      );
    }

    return '획득하기';
  };

  const getButtonClassName = () => {
    let className = styles.modalAcquireButton;

    if (isCollected) {
      className += ` ${styles.collected}`;
    } else if (acquiring) {
      className += ` ${styles.acquiring}`;
    } else if (acquireSuccess) {
      className += ` ${styles.success}`;
    }

    return className;
  };

  const getModalCardClassName = () => {
    let className = styles.modalCard;

    if (!isCollected) {
      className += ` ${styles.notCollected}`;
      if (acquiring) {
        className += ` ${styles.rotating}`;
      }

      if (acquireSuccess) {
        className += ` ${styles.filled}`;
      }
    } else {
      className += ` ${styles.collected}`;
    }

    return className;
  };

  const handleButtonClick = () => {
    if (isCollected) {
      // 수집된 스티커의 경우 카드 회전
      setIsFlipped(!isFlipped);
    } else {
      onAcquire();
    }
  };

  const handleCardClick = () => {
    if (isCollected) {
      // 수집된 스티커의 경우 카드 회전
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${getModalCardClassName()} ${
            isFlipped ? styles.flipped : ''
          }`}
          onClick={handleCardClick}
        >
          <div className={styles.modalSealCardWrapper}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <SealCard
                  seal={{
                    id: selectedSticker.id,
                    number: selectedSticker.number,
                    spotName: selectedSticker.spotName,
                    locationName: selectedSticker.locationName,
                    rarity: selectedSticker.rarity,
                    frontImageUrl: selectedSticker.frontImageUrl,
                    collected: isCollected,
                  }}
                  size="large"
                  imageOnly={true}
                />
              </div>
              {isCollected && selectedSticker.backImageUrl && (
                <div className={styles.cardBack}>
                  <SealCard
                    seal={{
                      id: selectedSticker.id,
                      number: selectedSticker.number,
                      spotName: selectedSticker.spotName,
                      locationName: selectedSticker.locationName,
                      rarity: selectedSticker.rarity,
                      frontImageUrl: selectedSticker.backImageUrl,
                      collected: isCollected,
                    }}
                    size="large"
                    imageOnly={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.modalButtonWrapper}>
          <button className={getButtonClassName()} onClick={handleButtonClick}>
            {getButtonContent()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcquireModal;
