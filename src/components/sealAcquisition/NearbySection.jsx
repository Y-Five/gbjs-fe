import styles from '../../pages/SealAcquisitionPage.module.css';
import { SealCard, SkeletonCard } from '../global';

const NearbySection = ({
  stickers,
  onStickerClick,
  formatDistance,
  loading = false,
  showNoNearbyMessage = false,
}) => {
  const renderStickerCard = (sticker, isPreview = false) => (
    <div className={styles.stickerCardWrapper}>
      <div
        className={styles.stickerCard}
        onClick={() => onStickerClick(sticker)}
      >
        <SealCard
          seal={{
            id: sticker.id,
            number: sticker.number,
            spotName: sticker.spotName,
            locationName: sticker.locationName,
            rarity: sticker.rarity,
            frontImageUrl: sticker.frontImageUrl,
            collected: sticker.collected || false,
          }}
          size="medium"
          imageOnly={true}
        />
      </div>
      {!isPreview && (
        <div className={styles.distanceBadge}>
          <span className={styles.distanceText}>
            {formatDistance
              ? formatDistance(sticker.distance)
              : `${sticker.distance}m`}
          </span>
        </div>
      )}
    </div>
  );

  const renderSkeletonCard = () => (
    <div className={styles.stickerCardWrapper}>
      <div className={styles.stickerCard}>
        <div className={styles.sealSkeleton}>
          <div className={styles.sealSkeletonImage}></div>
          <div className={styles.sealSkeletonBadge}></div>
          <div className={styles.sealSkeletonName}></div>
        </div>
      </div>
      <div className={styles.distanceBadge}>
        <div className={styles.skeletonDistanceText}></div>
      </div>
    </div>
  );

  return (
    <div className={styles.nearbySection}>
      <div className={styles.nearbyHeader}>
        <div className={styles.nearbyTitleRow}>
          <h2 className={styles.nearbyTitle}>근처 경북씰</h2>
        </div>
        <p className={styles.nearbyDescription}>
          내 위치에서 10km 이내로 모을 수 있는 경북씰이 보여요.
        </p>
      </div>

      <div className={styles.stickerGrid}>
        {loading ? (
          <>
            <div className={styles.stickerRow}>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`skeleton-${index}`}>{renderSkeletonCard()}</div>
              ))}
            </div>
            <div className={styles.stickerRow}>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`skeleton-${index + 2}`}>{renderSkeletonCard()}</div>
              ))}
            </div>
          </>
        ) : showNoNearbyMessage ? (
          <>
            <div className={styles.noNearbyMessage}>
              <p className={styles.noNearbyText}>
                10km 이내에 얻을 수 있는 경북씰이 없습니다
              </p>
              <p className={styles.noNearbySubText}>
                경북 여행을 통해 경북씰을 획득해보세요!
              </p>
            </div>
            <div className={styles.previewSection}>
              <div className={styles.previewTitle}>
                경북에서 얻을 수 있는 경북씰
              </div>
              <div className={styles.stickerRow}>
                {stickers.slice(0, 2).map((sticker) => (
                  <div key={sticker.id} className={styles.previewCard}>
                    {renderStickerCard(sticker, true)}
                    <div className={styles.previewDistance}>
                      {formatDistance
                        ? formatDistance(sticker.distance)
                        : `${sticker.distance}m`}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.stickerRow}>
                {stickers.slice(2, 4).map((sticker) => (
                  <div key={sticker.id} className={styles.previewCard}>
                    {renderStickerCard(sticker, true)}
                    <div className={styles.previewDistance}>
                      {formatDistance
                        ? formatDistance(sticker.distance)
                        : `${sticker.distance}m`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.stickerRow}>
              {stickers.slice(0, 2).map((sticker) => (
                <div key={sticker.id}>{renderStickerCard(sticker)}</div>
              ))}
            </div>
            <div className={styles.stickerRow}>
              {stickers.slice(2, 4).map((sticker) => (
                <div key={sticker.id}>{renderStickerCard(sticker)}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NearbySection;
