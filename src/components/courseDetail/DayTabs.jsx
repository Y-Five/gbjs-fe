import styles from "./DayTabs.module.css";

export default function DayTabs({ selectedDay, onChange }) {
  return (
    <div className={styles.tabs}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((day) => (
        <button
          key={day}
          className={day === selectedDay ? styles.active : styles.inactive}
          onClick={() => onChange(day)}
        >
          {day}일차
        </button>
      ))}
    </div>
  );
}
