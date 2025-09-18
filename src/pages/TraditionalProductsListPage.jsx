import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import { traditionService } from "../apis/main";
import styles from "./TraditionalProductsListPage.module.css";

export default function TraditionalProductsListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state || { type: "ACTIVITY" };

  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState(type);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef();

  // 전통상품 데이터 가져오기
  const fetchProducts = async (
    page = 1,
    reset = false,
    targetType = activeTab
  ) => {
    if (reset) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const data = await traditionService.getTraditions(targetType, page, 10);
      const newProducts = data.data?.content || [];

      if (reset) {
        setProducts(newProducts);
        setTotalElements(data.data?.totalElements || 0);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }

      setHasMore(!data.data?.last);
    } catch (err) {
      setError(err.message || "전통상품 정보를 가져올 수 없습니다.");
      console.error("전통상품 데이터 조회 실패:", err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchProducts(1, true, activeTab);
  }, [activeTab]);

  // 탭 변경 핸들러
  const handleTabChange = (newType) => {
    setActiveTab(newType);
    setPageNum(1);
    setHasMore(true);
    fetchProducts(1, true, newType);
  };

  // 무한스크롤을 위한 더보기 함수
  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore && !loading) {
      const nextPage = pageNum + 1;
      setPageNum(nextPage);
      fetchProducts(nextPage, false);
    }
  }, [hasMore, isLoadingMore, loading, pageNum]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore]);

  // 전통상품 카드 클릭 핸들러
  const handleProductClick = (product) => {
    if (product.redirectUrl) {
      window.open(product.redirectUrl, "_blank");
    }
  };

  return (
    <>
      <BackHeader title="전통상품 더보기" />
      <div className={styles.main}>
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

        <div className={styles.countSection}>
          <span className={styles.countText}>
            총 <span className={styles.countNumber}>{totalElements}</span>건
          </span>
        </div>

        <div className={styles.productWrapper}>
          <div className={styles.productList}>
            {loading && products.length === 0 ? (
              <div className={styles.loading}>
                전통상품 정보를 불러오는 중...
              </div>
            ) : error ? (
              <div className={styles.error}>
                전통상품 정보를 가져올 수 없습니다
              </div>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.traditionId || index}
                  className={styles.productCard}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name || "전통상품 이미지"}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <p className={styles.productLocation}>
                      {activeTab === "SPECIALTIES"
                        ? `${product.price || 0}원`
                        : product.address || "위치 정보 없음"}
                    </p>
                    <div className={styles.productNameRow}>
                      <p className={styles.productName}>
                        {product.name || "상품명 없음"}
                      </p>
                      <span className={styles.arrow}>›</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noDataCard}>
                <div className={styles.noDataTitle}>전통상품이 없습니다.</div>
                <div className={styles.noDataSubtitle}>
                  다른 카테고리에서 다양한 전통상품을 찾아보세요.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 무한스크롤 트리거 요소 */}
        {hasMore && products.length > 0 && (
          <div ref={observerRef} className={styles.scrollTrigger}>
            {isLoadingMore && (
              <div className={styles.loadingMore}>
                더 많은 전통상품을 불러오는 중...
              </div>
            )}
          </div>
        )}

        {/* 더 이상 로드할 데이터가 없을 때 */}
        {!hasMore && products.length > 0 && (
          <div className={styles.noMoreData}>모든 전통상품을 불러왔습니다.</div>
        )}
      </div>
    </>
  );
}
