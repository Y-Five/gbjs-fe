import { useState } from 'react';
import {
  SealsDataProvider,
  SealsAnimationProvider,
  SealsViewProvider,
  AllSealsPage as AllSealsPageComponent,
} from '../components/allSeals';

const SORT_OPTIONS = [
  { key: 'NUMBER', label: '번호순' },
  { key: 'RARITY', label: '희귀도순' },
  { key: 'LOCATION', label: '지역순' },
  { key: 'COLLECTED', label: '수집순' },
];

export default function AllSealsPage() {
  const [sortBy, setSortBy] = useState('NUMBER');

  const handleSortChange = (option) => setSortBy(option.key);

  return (
    <SealsDataProvider>
      {({
        seals,
        loading,
        error,
        totalCount,
        collectedCount,
        refreshSeals,
      }) => (
        <SealsAnimationProvider>
          {({ isSorting, isFlipped, startSortingAnimation }) => (
            <SealsViewProvider>
              {({
                showUserSeals,
                showLoginModal,
                isLoggedIn,
                handleViewToggle,
                handleLoginClick,
                handleCloseLoginModal,
                handleBackClick,
              }) => {
                // 정렬 변경 시 애니메이션과 함께 데이터 새로고침
                const handleSortChangeWithAnimation = async (option) => {
                  // 같은 정렬 방식이면 아무것도 하지 않음
                  if (option.key === sortBy) {
                    return;
                  }

                  setSortBy(option.key);

                  // 애니메이션과 함께 서버에 정렬 요청
                  if (seals.length > 0) {
                    await startSortingAnimation(() => refreshSeals(option.key));
                  } else {
                    await refreshSeals(option.key);
                  }
                };

                // 현재 표시할 띠부씰 데이터
                const currentSeals = showUserSeals
                  ? seals.filter((seal) => seal.collected)
                  : seals;

                return (
                  <AllSealsPageComponent
                    loading={loading}
                    error={error}
                    seals={currentSeals}
                    totalCount={totalCount}
                    collectedCount={collectedCount}
                    sortBy={sortBy}
                    showUserSeals={showUserSeals}
                    isSorting={isSorting}
                    isFlipped={isFlipped}
                    showLoginModal={showLoginModal}
                    isLoggedIn={isLoggedIn}
                    sortOptions={SORT_OPTIONS}
                    onBackClick={handleBackClick}
                    onSortChange={handleSortChangeWithAnimation}
                    onViewToggle={handleViewToggle}
                    onLoginClick={handleLoginClick}
                    onCloseLoginModal={handleCloseLoginModal}
                  />
                );
              }}
            </SealsViewProvider>
          )}
        </SealsAnimationProvider>
      )}
    </SealsDataProvider>
  );
}
