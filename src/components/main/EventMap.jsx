import styles from "./EventMap.module.css";
import GyeongbukMap from "../regionMap/GyeongbukMap";
import festival1 from "../../assets/images/festival1.png";

export default function EventMap() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>행사지도</h3>
      <p className={styles.sub}>경북의 행사를 지도로 한 눈에 살펴봐요!</p>

      <div className={styles.map}>
        <GyeongbukMap onSelect={(regionName) => console.log(regionName)} />
      </div>

      <div className={styles.eventList}>
        <div className={styles.eventCard}>
          <img
            src={festival1}
            alt="문경 찻사발 축제"
            className={styles.eventImage}
          />
          <div className={styles.eventInfo}>
            <p className={styles.eventLocation}>경상북도 인동시</p>
            <p className={styles.eventTitle}>
              안동 국가유산 야행 &quot;월영야행&quot;
            </p>
            <p className={styles.eventDate}>2025년 5월 1일 ~ 5월 5일</p>
          </div>
        </div>

        <div className={styles.eventCard}>
          <img
            src={festival1}
            alt="문경 찻사발 축제"
            className={styles.eventImage}
          />
          <div className={styles.eventInfo}>
            <p className={styles.eventLocation}>경상북도 인동시</p>
            <p className={styles.eventTitle}>
              안동 국가유산 야행 &quot;월영야행&quot;
            </p>
            <p className={styles.eventDate}>2025년 5월 1일 ~ 5월 5일</p>
          </div>
        </div>

        <button className={styles.loadMoreButton}>더보기</button>
      </div>
    </section>
  );
}
