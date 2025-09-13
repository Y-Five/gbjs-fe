import { useState, useEffect } from "react";
import styles from "./TraditionalProducts.module.css";
import { traditionService } from "../../apis/main";

export default function TraditionalProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ACTIVITY"); // 기본값: 체험형

  // API 데이터 가져오기
  const fetchTraditions = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await traditionService.getTraditions(type, 1, 3);
      setProducts(response.data?.content || []);
    } catch (err) {
      console.error("전통상품 데이터 조회 실패:", err);
      setError(err);
      setProducts([]); // 에러 시 빈 배열로 설정
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 체험형 데이터 로드
  useEffect(() => {
    fetchTraditions("ACTIVITY");
  }, []);

  // 탭 변경 핸들러
  const handleTabChange = (type) => {
    setActiveTab(type);
    fetchTraditions(type);
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>전통상품</h3>
      <p className={styles.sub}>경북만의 특색있는 전통 상품을 알아봐요!</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "ACTIVITY" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("ACTIVITY")}
        >
          체험형
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "SPECIALTIES" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("SPECIALTIES")}
        >
          기념품
        </button>
      </div>

      <div className={styles.productWrapper}>
        {loading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : error ? (
          <div className={styles.error}>데이터를 불러올 수 없습니다.</div>
        ) : products.length === 0 ? (
          <div className={styles.noData}>데이터가 없습니다.</div>
        ) : (
          <div className={styles.productList}>
            {products.map((product, index) => (
              <div key={product.traditionId || index} className={styles.card}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <p className={styles.location}>{product.address}</p>
                  <div className={styles.nameRow}>
                    <p className={styles.name}>{product.name}</p>
                    <span className={styles.arrow}>›</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
