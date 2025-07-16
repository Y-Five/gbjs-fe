import styles from "./SearchWeather.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import rainCharacter from "../../assets/images/rain-character.png";

export default function SearchWeather() {
  return (
    <section className={styles.section}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="경북의 어떤 관광지를 찾으세요?"
          className={styles.input}
        />
        <AiOutlineSearch className={styles.searchIcon} />
      </div>

      <div className={styles.weatherCard}>
        <div className={styles.weatherInfo}>
          <div className={styles.highSection}>
            <p className={styles.title}>경북날씨</p>
            <p className={styles.location}>영양군, 6월 28일 (화) &gt;</p>
          </div>
          <div className={styles.lowSection}>
            <div className={styles.temperature}>
              <span className={styles.low}>21</span>|
              <span className={styles.high}>32</span>
            </div>
            <p className={styles.description}>29°C, 소나기</p>
          </div>
        </div>
        <img
          src={rainCharacter}
          alt="날씨 캐릭터"
          className={styles.character}
        />
      </div>
    </section>
  );
}
