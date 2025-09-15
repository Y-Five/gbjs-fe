import BackHeader from '../header/BackHeader';
import { Dropdown, SealCard, AlertModal } from '../global';
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
  // 에러 상태
  if (error) {
    return (
      <div className={styles.page}>
        <BackHeader title="전체 띠부씰 보기" />
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
    </div>
  );
}
