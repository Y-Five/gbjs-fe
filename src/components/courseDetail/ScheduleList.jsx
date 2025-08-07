import styles from "./ScheduleList.module.css";
import Line from "../../assets/images/scheduleList/line.png";

export default function ScheduleList({ day, schedules, showRegenerateButton = true }) {
  return (
    <div className={styles.list}>
      <p className={styles.label}>코스가 마음에 드신다면 저장해주세요.</p>
      <p className={styles.titleRow}>
        <span className={styles.title}>6월 24일 안동,의성,영천 코스</span>
        {showRegenerateButton && (
          <button className={styles.regenerateBtn}>재생성</button>
        )}
      </p>

      <ul className={styles.ul}>
        {schedules.map((item, idx) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.dotWrapper}>
              <span className={styles.number}>{item.id}</span>

              {/* 마지막 항목이 아닐 때만 선 이미지 표시 */}
              {idx !== schedules.length - 1 && (
                <>
                  <img src={Line} />
                  <div className={styles.verticalLine} />
                </>
              )}
            </div>
            <div className={styles.spotSection}>
              <p className={styles.name}>{item.title}</p>
              <p className={styles.type}>{item.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
