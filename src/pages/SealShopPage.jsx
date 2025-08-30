import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import styles from './SealShopPage.module.css';
import magpieImage from '../assets/images/magpie2.png';
import { getSealProducts } from '../apis/sealApi';

export default function SealShopPage() {
  const navigate = useNavigate();
  const [collectedSeals] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalSeals = 18;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getSealProducts();

        if (response?.products?.length > 0) {
          setProducts(response.products);
        } else {
          setError('상품 정보를 불러올 수 없습니다.');
        }
      } catch (error) {
        console.error('상품 조회 실패:', error);
        setError('상품 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAllSealsClick = () => {
    navigate('/allseals');
  };

  return (
    <div className={styles.page}>
      <Header title="띠부씰 상품" isDark={true} />

      <main className={styles.main}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <p className={styles.bannerMainText}>
              자신이 모은 띠부씰과
              <br />
              교환할 수 있는 상품을 확인해봐요!
            </p>
            <p className={styles.bannerSubText}>
              수집 띠부씰을 한 눈에 볼 수 있어요, 짹짹!
            </p>
            <img
              src={magpieImage}
              alt="짹짹이"
              className={styles.magpieImage}
            />
          </div>
        </div>

        <div className={styles.collectionCard}>
          <h3 className={styles.collectionTitle}>띠부씰 수집 현황</h3>

          <div className={styles.collectionCount}>
            <span className={styles.countNumber}>{collectedSeals}</span>
            <span className={styles.countUnit}>개</span>
          </div>

          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>띠부씰 수집 완료까지</span>
            <span className={styles.progressRemaining}>
              {totalSeals - collectedSeals}개 남음
            </span>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(collectedSeals / totalSeals) * 100}%` }}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.shopButton}>띠부씰 상품 보기</button>
            <button
              className={styles.allSealsButton}
              onClick={handleAllSealsClick}
            >
              전체 띠부씰 보기
            </button>
          </div>
        </div>

        <section className={styles.exchangeSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>띠부씰 교환상품</h2>
            <p className={styles.sectionSubtitle}>
              인기 있는 관광지에서 띠부씰을 모아보세요!
            </p>
          </div>

          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>상품을 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorContainer}>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={styles.productCard}
                  onClick={() => navigate(`/sealshop/exchange/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.productImage}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = magpieImage;
                      }}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.requiredSeals}>
                      스티커 {product.price}개
                    </span>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productDescription}>
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
