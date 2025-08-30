import { useCallback } from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [product, onAddToCart]);

  const formatPrice = (price) => {
    return price.toLocaleString() + "원";
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className={styles.image}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span className={styles.placeholderText}>띠부씰</span>
          </div>
        )}
        {product.isPopular && (
          <span className={styles.popularBadge}>인기</span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className={styles.lowStockBadge}>품절임박</span>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.tags}>
            <span className={styles.categoryTag}>{product.category}</span>
            <span className={styles.regionTag}>{product.region}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.priceSection}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span className={styles.stock}>재고 {product.stock}개</span>
          </div>
          
          <button 
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "품절" : "장바구니"}
          </button>
        </div>
      </div>
    </div>
  );
}