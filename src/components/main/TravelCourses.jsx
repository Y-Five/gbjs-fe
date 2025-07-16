import styles from "./TravelCourses.module.css";
import mountainImg from "../../assets/images/mountain.jpg";
import raceImg from "../../assets/images/race.jpg";

export default function TravelCourses() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>여행코스</h3>
      <p className={styles.sub}>
        원하는 코스를 골라 아름다운 경북을 여행하세요.
      </p>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>
          테마별 코스
        </button>
        <button className={styles.tab}>행사별 코스</button>
      </div>

      <div className={styles.cardContainer}>
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${mountainImg})` }}
        >
          <div className={styles.overlay}>
            <p className={styles.name}>아름다운 경북의 산을 보기 위한 코스</p>
            <p className={styles.location}>안동시</p>
          </div>
        </div>

        <div
          className={styles.card}
          style={{ backgroundImage: `url(${raceImg})` }}
        >
          <div className={styles.overlay}>
            <p className={styles.name}>
              다채로운 무형유산을 체험하기 위한 코스
            </p>
            <p className={styles.location}>영양군</p>
          </div>
        </div>
      </div>
    </section>
  );
}
