import styles from '../../pages/SealAcquisitionPage.module.css';
import { SealCard } from '../global';

const NearbySection = ({ stickers, onStickerClick, formatDistance }) => {
  const renderStickerCard = (sticker) => (
    <div key={sticker.sealId} className={styles.stickerCardWrapper}>
      <div
        className={styles.stickerCard}
        onClick={() => onStickerClick(sticker)}
      >
        <SealCard
          seal={{
            id: sticker.sealId,
            number: sticker.number,
            spotName: sticker.spot_name,
            locationName: sticker.location_name,
            rarity: sticker.rarity,
            frontImageUrl: sticker.frontImageUrl,
            collected: sticker.collected || false,
          }}
          size="medium"
        />
      </div>
      <div className={styles.distanceBadge}>
        <span className={styles.distanceText}>
          {formatDistance
            ? formatDistance(sticker.distance)
            : `${sticker.distance}m`}
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.nearbySection}>
      <div className={styles.nearbyHeader}>
        <div className={styles.nearbyTitleRow}>
          <h2 className={styles.nearbyTitle}>근처 스티커</h2>
        </div>
        <p className={styles.nearbyDescription}>
          내 위치에서 1km 이내로 모을 수 있는 스티커가 보여요.
        </p>
      </div>

      <div className={styles.stickerGrid}>
        <div className={styles.stickerRow}>
          {stickers.slice(0, 2).map(renderStickerCard)}
        </div>
        <div className={styles.stickerRow}>
          {stickers.slice(2, 4).map(renderStickerCard)}
        </div>
      </div>
    </div>
  );
};

export default NearbySection;
