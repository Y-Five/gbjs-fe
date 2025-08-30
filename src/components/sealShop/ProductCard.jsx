import React from 'react';
import styles from '../../pages/SealShopPage.module.css';
import magpieImage from '../../assets/images/magpie2.png';

const ProductCard = ({
  product,
  collectedSeals,
  onProductClick,
  isLoggedIn,
}) => {
  const isInsufficient = collectedSeals < product.price;

  const handleImageError = (e) => {
    e.target.src = magpieImage;
  };

  return (
    <div
      className={`${styles.productCard} ${
        isInsufficient ? styles.insufficient : ''
      }`}
      onClick={() => onProductClick(product)}
    >
      <div className={styles.productImage}>
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={handleImageError}
        />
      </div>
      <div className={styles.productInfo}>
        <span className={styles.requiredSeals}>스티커 {product.price}개</span>
        <h4 className={styles.productName}>{product.name}</h4>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
