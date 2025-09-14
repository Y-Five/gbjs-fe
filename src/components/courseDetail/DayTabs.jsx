import styles from "./DayTabs.module.css";

export default function DayTabs({ selectedDay, onChange, courseData }) {
  // API 데이터에서 실제 일차 수 계산
  const totalDays = courseData?.dailyCourses?.length || 0;
  const days = Array.from({ length: Math.max(totalDays, 1) }, (_, i) => i + 1);

  return (
    <div className={styles.tabs}>
      {days.map((day) => (
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
