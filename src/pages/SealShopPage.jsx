import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import styles from "./SealShopPage.module.css";
import magpieImage from "../assets/images/magpie2.png";
import mountainImage from "../assets/images/mountain.png";

export default function SealShopPage() {
  const navigate = useNavigate();
  const [collectedSeals] = useState(0);
  const totalSeals = 18;

  const exchangeProducts = [
    {
      id: 1,
      name: "편의점 상품권 5,000원",
      requiredSeals: 5,
      image: mountainImage
    },
    {
      id: 2,
      name: "경주 스타벅스 텀블러",
      requiredSeals: 10,
      image: mountainImage
    },
    {
      id: 3,
      name: "편의점 상품권 5,000원",
      requiredSeals: 5,
      image: mountainImage
    },
    {
      id: 4,
      name: "경주 스타벅스 텀블러",
      requiredSeals: 10,
      image: mountainImage
    },
    {
      id: 5,
      name: "편의점 상품권 5,000원",
      requiredSeals: 5,
      image: mountainImage
    },
    {
      id: 6,
      name: "경주 스타벅스 텀블러",
      requiredSeals: 10,
      image: mountainImage
    }
  ];

  const handleAllSealsClick = () => {
    navigate("/allseals");
  };

  return (
    <div className={styles.page}>
      <Header title="띠부씰 상품" isDark={true} />
      
      <main className={styles.main}>
        {/* 상단 배너 */}
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <p className={styles.bannerMainText}>
              자신이 모은 띠부씰과<br />
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

        {/* 수집 현황 카드 */}
        <div className={styles.collectionCard}>
          <h3 className={styles.collectionTitle}>띠부씰 수집 현황</h3>
          
          <div className={styles.collectionCount}>
            <span className={styles.countNumber}>{collectedSeals}</span>
            <span className={styles.countUnit}>개</span>
          </div>

          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>띠부씰 수집 완료까지</span>
            <span className={styles.progressRemaining}>{totalSeals - collectedSeals}개 남음</span>
          </div>

          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(collectedSeals / totalSeals) * 100}%` }}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.shopButton}>
              띠부씰 상품 보기
            </button>
            <button 
              className={styles.allSealsButton}
              onClick={handleAllSealsClick}
            >
              전체 띠부씰 보기
            </button>
          </div>
        </div>

        {/* 교환상품 섹션 */}
        <section className={styles.exchangeSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>띠부씰 교환상품</h2>
            <p className={styles.sectionSubtitle}>
              인기 있는 관광지에서 띠부씰을 모아보세요!
            </p>
          </div>

          <div className={styles.productGrid}>
            {exchangeProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.requiredSeals}>
                    스티커 {product.requiredSeals}개
                  </span>
                  <h4 className={styles.productName}>{product.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}