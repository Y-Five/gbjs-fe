import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <img 
            src="/images/sealCharacter.png" 
            alt="empty" 
            className={styles.emptyIcon}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h3 className={styles.emptyTitle}>상품이 없습니다</h3>
          <p className={styles.emptyDescription}>
            다른 카테고리나 지역을 선택해보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.count}>
          총 {products.length}개의 상품
        </span>
      </div>
      
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}