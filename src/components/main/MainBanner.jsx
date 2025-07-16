import styles from "./MainBanner.module.css";
import bannerImg from "../../assets/images/main-banner.png";

export default function MainBanner() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className={styles.overlay}>
        <nav className={styles.tabMenu}>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("weatherSection")}
          >
            경북날씨
          </button>
          <p>|</p>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("courseSection")}
          >
            여행코스
          </button>
          <p>|</p>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("eventSection")}
          >
            행사지도
          </button>
          <p>|</p>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("productSection")}
          >
            전통상품
          </button>
        </nav>
      </div>
    </section>
  );
}
