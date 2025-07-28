import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko"; // 한글 locale
import styles from "./DateSelector.module.css";

export default function DateSelector() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingDate, setSelectingDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
      handleDateChange([startDate, selectingDate]);
    }
    setIsDragging(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>1. 날짜 선택</h3>
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
          dayClassName={(date) => {
            if (!startDate || endDate) return undefined;
            
            if (selectingDate && startDate && !endDate) {
              const start = startDate < selectingDate ? startDate : selectingDate;
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
                  <span className={styles.yearText}>
                    {date.getFullYear()}
                  </span>
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
