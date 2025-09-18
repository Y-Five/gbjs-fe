import PropTypes from "prop-types";
import styles from "./ScheduleList.module.css";
import Line from "../../assets/images/scheduleList/line.png";

export default function ScheduleList({
  day,
  schedules,
  courseData,
  onRegenerate,
  isRegenerating,
}) {
  // 현재 선택된 일차의 정보 가져오기
  const currentDayData = courseData?.dailyCourses?.find(
    (course) => course.dayNumber === day
  );

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  // 지역 정보 가져오기
  const location = currentDayData?.location || "";
  const date = currentDayData?.date || "";

  return (
    <div className={styles.list}>
      <p className={styles.label}>코스가 마음에 드신다면 저장해주세요.</p>
      <p className={styles.titleRow}>
        <span className={styles.title}>
          {courseData?.title || `${formatDate(date)} ${location} 코스`}
        </span>
        {onRegenerate && (
          <button
            className={styles.regenerateBtn}
            onClick={onRegenerate}
            disabled={isRegenerating}
          >
            {isRegenerating ? "재생성 중..." : "재생성"}
          </button>
        )}
      </p>

      <ul className={styles.ul}>
        {schedules.map((item, idx) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.dotWrapper}>
              <span className={styles.number}>
                {item.visitOrder || idx + 1}
              </span>

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
              {item.addr1 && <p className={styles.address}>{item.addr1}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ScheduleList.propTypes = {
  day: PropTypes.number.isRequired,
  schedules: PropTypes.array.isRequired,
  courseData: PropTypes.object,
  onRegenerate: PropTypes.func,
  isRegenerating: PropTypes.bool,
};
