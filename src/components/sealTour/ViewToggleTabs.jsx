import styles from "./ViewToggleTabs.module.css";

export default function ViewToggleTabs({ viewMode, onChange }) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${viewMode === "course" ? styles.active : ""}`}
        onClick={() => onChange("course")}
      >
        코스 중심
      </button>
      <button
        className={`${styles.tab} ${viewMode === "region" ? styles.active : ""}`}
        onClick={() => onChange("region")}
      >
        행정구역 중심
      </button>
    </div>
  );
}
