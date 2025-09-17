import React, { forwardRef } from 'react';
import { ProductCard } from './';
import ProductGridSkeleton from './ProductGridSkeleton';
import RetryButton from './RetryButton';
import styles from '../../pages/SealShopPage.module.css';

const ProductSection = forwardRef(
  (
    {
      products,
      collectedSeals,
      onProductClick,
      isLoggedIn,
      productsLoading,
      productsError,
      onRetryProducts,
    },
    ref
  ) => {
    return (
      <section className={styles.exchangeSection} ref={ref}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>경북씰 교환상품</h2>
          <p className={styles.sectionSubtitle}>
            인기 있는 관광지에서 경북씰을 모아보세요!
          </p>
        </div>

        {productsLoading ? (
          <ProductGridSkeleton />
        ) : productsError ? (
          <RetryButton onRetry={onRetryProducts} isLoading={productsLoading} />
        ) : (
          <div className={styles.productGrid}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  collectedSeals={collectedSeals}
                  onProductClick={onProductClick}
                  isLoggedIn={isLoggedIn}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>교환 상품이 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </section>
    );
  }
);

ProductSection.displayName = 'ProductSection';

export default ProductSection;
