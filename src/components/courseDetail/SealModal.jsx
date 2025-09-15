import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./SealModal.module.css";

export default function SealModal({ seal, isOpen, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1); // 1: 오른쪽, -1: 왼쪽
  const cardRef = useRef(null);

  if (!isOpen || !seal) return null;

  const handleFlip = () => {
    setFlipDirection(1); // 클릭 시에는 기본적으로 오른쪽 방향
    setIsFlipped(!isFlipped);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = 50; // 최소 드래그 거리

    if (Math.abs(deltaX) > threshold) {
      // 오른쪽으로 드래그하면 앞면->뒷면, 왼쪽으로 드래그하면 뒷면->앞면
      if (deltaX > 0 && !isFlipped) {
        setFlipDirection(1); // 오른쪽 방향
        setIsFlipped(true);
      } else if (deltaX < 0 && isFlipped) {
        setFlipDirection(-1); // 왼쪽 방향
        setIsFlipped(false);
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.clientX);
    setCurrentX(touch.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setCurrentX(touch.clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      // 오른쪽으로 드래그하면 앞면->뒷면, 왼쪽으로 드래그하면 뒷면->앞면
      if (deltaX > 0 && !isFlipped) {
        setFlipDirection(1); // 오른쪽 방향
        setIsFlipped(true);
      } else if (deltaX < 0 && isFlipped) {
        setFlipDirection(-1); // 왼쪽 방향
        setIsFlipped(false);
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.cardContainer}>
          <div
            ref={cardRef}
            className={styles.card}
            onClick={handleFlip}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: isDragging
                ? `rotateY(${isFlipped ? 180 * flipDirection : 0}deg) rotateY(${
                    (currentX - startX) * 0.2
                  }deg)`
                : `rotateY(${isFlipped ? 180 * flipDirection : 0}deg)`,
            }}
          >
            <div className={styles.front}>
              <img
                src={seal.sealData?.frontImageUrl}
                alt={seal.title}
                className={styles.sealImage}
              />
            </div>
            <div className={styles.back}>
              <div
                className={styles.backImage}
                style={{
                  backgroundImage: `url(${seal.sealData?.backImageUrl})`,
                }}
              />
            </div>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

SealModal.propTypes = {
  seal: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
