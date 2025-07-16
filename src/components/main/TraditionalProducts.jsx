import styles from "./TraditionalProducts.module.css";
import product1 from "../../assets/images/product1.png";

export default function TraditionalProducts() {
  const products = [
    {
      id: 1,
      image: product1,
      location: "경상북도 경주시",
      name: "전통 박물관 & 금관 만들기 체험",
    },
    {
      id: 2,
      image: product1,
      location: "경상북도 경주시",
      name: "금관 만들기 체험",
    },
    {
      id: 3,
      image: product1,
      location: "경상북도 경주시",
      name: "전통 박물관 & 금관 만들기 체험",
    },
  ];

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>전통상품</h3>
      <p className={styles.sub}>경북만의 특색있는 전통 상품을 알아봐요!</p>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>체험형</button>
        <button className={styles.tab}>기념품</button>
      </div>

      <div className={styles.productWrapper}>
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />
              <div className={styles.info}>
                <p className={styles.location}>{product.location}</p>
                <div className={styles.nameRow}>
                  <p className={styles.name}>{product.name}</p>
                  <span className={styles.arrow}>›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
