import React, { useRef } from 'react';
import Header from '../components/header/Header';
import {
  Banner,
  CollectionCard,
  ProductSection,
  InsufficientModal,
  SealShopContainer,
  LoadingState,
} from '../components/sealShop';
import ProductGridSkeleton from '../components/sealShop/ProductGridSkeleton';
import { AlertModal, SkeletonCard } from '../components/global';
import styles from './SealShopPage.module.css';

export default function SealShopPage() {
  const exchangeSectionRef = useRef(null);

  return (
    <SealShopContainer>
      {({
        collectedSeals,
        totalSeals,
        products,
        loading,
        productsLoading,
        userSealsLoading,
        productsError,
        userSealsError,
        selectedProduct,
        showInsufficientModal,
        showLoginModal,
        isLoggedIn,
        handleAllSealsClick,
        handleShopButtonClick,
        handleProductClick,
        handleLoginClick,
        handleCloseLoginModal,
        handleCloseInsufficientModal,
        handleRetryProducts,
        handleRetryUserSeals,
      }) => {
        const handleShopButtonClickWithScroll = () => {
          handleShopButtonClick();
          // 로그인된 경우에만 스크롤
          if (isLoggedIn) {
            exchangeSectionRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        };

        return (
          <div className={styles.page}>
            <Header title="띠부씰 상품" isDark={true} />

            <main className={styles.main}>
              <Banner />

              <CollectionCard
                collectedSeals={collectedSeals}
                totalSeals={totalSeals}
                onAllSealsClick={handleAllSealsClick}
                onShopButtonClick={handleShopButtonClickWithScroll}
                isLoggedIn={isLoggedIn}
                userSealsLoading={userSealsLoading}
                userSealsError={userSealsError}
                onRetryUserSeals={handleRetryUserSeals}
              />

              <ProductSection
                ref={exchangeSectionRef}
                products={products}
                collectedSeals={collectedSeals}
                onProductClick={handleProductClick}
                isLoggedIn={isLoggedIn}
                productsLoading={productsLoading}
                productsError={productsError}
                onRetryProducts={handleRetryProducts}
              />
            </main>

            <InsufficientModal
              showModal={showInsufficientModal}
              selectedProduct={selectedProduct}
              collectedSeals={collectedSeals}
              onClose={handleCloseInsufficientModal}
            />

            <AlertModal
              showModal={showLoginModal}
              onClose={handleCloseLoginModal}
              onConfirm={handleLoginClick}
              message="로그인이 필요한 서비스 입니다."
            />
          </div>
        );
      }}
    </SealShopContainer>
  );
}
