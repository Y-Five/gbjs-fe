import styles from '../../pages/SealExchangePage.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img
          src={product?.imageUrl}
          alt={product?.name}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product?.name}</h3>
        <p className={styles.productDescription}>{product?.description}</p>
        <span className={styles.requiredSeals}>
          스티커 {product?.price}개 필요
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
