import { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko"; // 한글 locale
import styles from "./DateSelector.module.css";

export default function DateSelector({
  startDate: propStartDate,
  endDate: propEndDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const [startDate, setStartDate] = useState(
    propStartDate ? new Date(propStartDate) : null
  );
  const [endDate, setEndDate] = useState(
    propEndDate ? new Date(propEndDate) : null
  );
  const [selectingDate, setSelectingDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    // 5일 제한 검사
    if (start && end) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays > 5) {
        alert("여행 기간은 최대 5일까지 선택할 수 있습니다.");
        return; // 5일 초과 시 선택 취소
      }
    }

    setStartDate(start);
    setEndDate(end);

    // 부모 컴포넌트에 날짜 전달 (로컬 시간대 기준으로 YYYY-MM-DD 형식)
    if (onStartDateChange) {
      if (start) {
        const year = start.getFullYear();
        const month = String(start.getMonth() + 1).padStart(2, "0");
        const day = String(start.getDate()).padStart(2, "0");
        onStartDateChange(`${year}-${month}-${day}`);
      } else {
        onStartDateChange("");
      }
    }
    if (onEndDateChange) {
      if (end) {
        const year = end.getFullYear();
        const month = String(end.getMonth() + 1).padStart(2, "0");
        const day = String(end.getDate()).padStart(2, "0");
        onEndDateChange(`${year}-${month}-${day}`);
      } else {
        onEndDateChange("");
      }
    }

    if (end) {
      setSelectingDate(null);
      setIsDragging(false);
    }
  };

  const handleDayMouseEnter = (date) => {
    if (isDragging && startDate && !endDate) {
      setSelectingDate(date);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (isDragging && startDate && selectingDate) {
      // 드래그 선택 시에도 5일 제한 적용
      const diffTime = Math.abs(selectingDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays > 5) {
        alert("여행 기간은 최대 5일까지 선택할 수 있습니다.");
        setIsDragging(false);
        return;
      }

      handleDateChange([startDate, selectingDate]);
    }
    setIsDragging(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>1. 날짜 선택 (최대 5일)</h3>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={ko}
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect={false}
          showPopperArrow={false}
          onDayMouseEnter={handleDayMouseEnter}
          onMonthMouseLeave={() => setSelectingDate(null)}
          calendarClassName={styles.calendarWrapper}
          minDate={new Date()} // 오늘 이전 날짜 선택 불가
          maxDate={
            startDate
              ? new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000)
              : null
          }
          dayClassName={(date) => {
            if (!startDate || endDate) return undefined;

            if (selectingDate && startDate && !endDate) {
              const start =
                startDate < selectingDate ? startDate : selectingDate;
              const end = startDate < selectingDate ? selectingDate : startDate;

              if (date >= start && date <= end) {
                if (date.getTime() === start.getTime()) {
                  return "react-datepicker__day--selecting-range-start";
                } else if (date.getTime() === end.getTime()) {
                  return "react-datepicker__day--selecting-range-end";
                } else {
                  return "react-datepicker__day--in-selecting-range";
                }
              }
            }
            return undefined;
          }}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={styles.headerContainer}>
              <div className={styles.headerNavigation}>
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className={styles.navButton}
                >
                  {"<"}
                </button>
                <div className={styles.dateDisplay}>
                  <span className={styles.yearText}>{date.getFullYear()}</span>
                  <span className={styles.monthText}>
                    {`${date.getMonth() + 1}월`}
                  </span>
                </div>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className={styles.navButton}
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

DateSelector.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
};
