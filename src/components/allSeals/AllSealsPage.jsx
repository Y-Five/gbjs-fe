import { useState } from 'react';
import BackHeader from '../header/BackHeader';
import { Dropdown, SealCard, AlertModal } from '../global';
import '../../styles/modal-common.css';
import {
  CollectionCard,
  CollectionCardSkeleton,
  ViewToggle,
  SortSection,
  SealsGrid,
  SealsGridSkeleton,
  EmptyState,
  LoadingState,
  ErrorState,
} from './';
import styles from '../../pages/AllSealsPage.module.css';

export default function AllSealsPage({
  loading,
  error,
  seals,
  totalCount,
  collectedCount,
  sortBy,
  showUserSeals,
  isSorting,
  isFlipped,
  showLoginModal,
  isLoggedIn,
  sortOptions,
  onBackClick,
  onSortChange,
  onViewToggle,
  onLoginClick,
  onCloseLoginModal,
  onRetry,
}) {
  const [showSealModal, setShowSealModal] = useState(false);
  const [selectedSeal, setSelectedSeal] = useState(null);
  const [isModalFlipped, setIsModalFlipped] = useState(false);

  const handleSealClick = (seal) => {
    if (seal.collected) {
      setSelectedSeal(seal);
      setShowSealModal(true);
      setIsModalFlipped(false);
    }
  };

  const handleCardClick = () => {
    if (selectedSeal?.collected) {
      setIsModalFlipped(!isModalFlipped);
    }
  };

  const handleCloseModal = () => {
    setShowSealModal(false);
    setSelectedSeal(null);
    setIsModalFlipped(false);
  };
  // 에러 상태
  if (error) {
    return (
      <div className={styles.page}>
        <BackHeader title="전체 경북씰 보기" />
        <main className={styles.main}>
          <ErrorState
            error={error}
            onBackClick={onBackClick}
            onRetry={onRetry}
            isLoading={loading}
          />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <BackHeader title="전체 띠부씰 보기" />

      <main className={styles.main}>
        {loading ? (
          <CollectionCardSkeleton />
        ) : (
          <CollectionCard
            totalCount={totalCount}
            collectedCount={collectedCount}
          />
        )}

        <ViewToggle showUserSeals={showUserSeals} onViewToggle={onViewToggle} />

        <SortSection
          sortBy={sortBy}
          sortOptions={sortOptions}
          onSortChange={onSortChange}
        />

        {loading ? (
          <SealsGridSkeleton />
        ) : (
          <SealsGrid
            seals={seals}
            isSorting={isSorting}
            isFlipped={isFlipped}
            onSealClick={handleSealClick}
          />
        )}

        <EmptyState
          seals={seals}
          showUserSeals={showUserSeals}
          isLoggedIn={isLoggedIn}
        />
      </main>

      <AlertModal
        showModal={showLoginModal}
        onClose={onCloseLoginModal}
        onConfirm={onLoginClick}
        message="로그인이 필요한 서비스 입니다."
      />

      {/* 경북씰 모달 */}
      {showSealModal && selectedSeal && (
        <div className="modalOverlay" onClick={handleCloseModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div
              className={`modalCard ${isModalFlipped ? 'flipped' : ''}`}
              onClick={handleCardClick}
            >
              <div className="modalSealCardWrapper">
                <div className="cardInner">
                  <div className="cardFront">
                    <SealCard
                      seal={{
                        id: selectedSeal.id,
                        number: selectedSeal.number,
                        spotName: selectedSeal.spotName,
                        locationName: selectedSeal.locationName,
                        rarity: selectedSeal.rarity,
                        frontImageUrl: selectedSeal.frontImageUrl,
                        collected: selectedSeal.collected,
                      }}
                      size="large"
                      imageOnly={true}
                    />
                  </div>
                  {selectedSeal.collected && selectedSeal.backImageUrl && (
                    <div className="cardBack">
                      <SealCard
                        seal={{
                          id: selectedSeal.id,
                          number: selectedSeal.number,
                          spotName: selectedSeal.spotName,
                          locationName: selectedSeal.locationName,
                          rarity: selectedSeal.rarity,
                          frontImageUrl: selectedSeal.backImageUrl,
                          collected: selectedSeal.collected,
                        }}
                        size="large"
                        imageOnly={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modalButtonWrapper">
              <button
                className="modalButton modalCloseButton"
                onClick={handleCloseModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
