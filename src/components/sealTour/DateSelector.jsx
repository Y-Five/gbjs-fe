import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled, { createGlobalStyle } from "styled-components";
import ko from "date-fns/locale/ko"; // 한글 locale

const GlobalStyle = createGlobalStyle`
  .react-datepicker {
    border: none;
    font-family: "Pretendard", sans-serif;
    background-color: white;
    border-radius: 20px;
    padding: 20px 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .react-datepicker__header {
    background-color: white;
    border: none;
  }

  .react-datepicker__month-container {
    float: none;
  }

  .react-datepicker__current-month {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
    justify-content: center;
    padding: 0 8px;
    gap: 4px;
    margin: 0;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    margin: 0;
    padding: 0;
    border-radius: 10px;
  }

  .react-datepicker__day {
    position: relative;
    z-index: 1;
  }

  .react-datepicker__navigation {
    top: 22px;
  }

  .react-datepicker__navigation--previous {
    left: 60px;
  }

  .react-datepicker__navigation--next {
    right: 60px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: black;
  }

  .react-datepicker__day--disabled {
    color: #d3d3d3;
  }

  /* 단일 선택 */
  .react-datepicker__day--range-start.react-datepicker__day--range-end {
    background-color: var(--blue-main);
    color: white;
    border-radius: 10px !important;
    z-index: 2;
  }

  /* 숫자는 흰색 */
  .react-datepicker__day--in-range,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    color: white !important;
  }

/* 중간 날짜: 네모로 붙임 */
.react-datepicker__day--in-range:not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end)::before {
  content: "";
  position: absolute;
  top: 0;
  left: -4px;
  right: -4px;
  bottom: 0;
  background-color: var(--blue-main);
  border-radius: 0;
  z-index: -1;
}

/* 시작 날짜: 왼쪽만 둥글게 */
.react-datepicker__day--range-start:not(.react-datepicker__day--range-end)::before {
  content: "";
  position: absolute;
  top: 0;
  left: -4px;
  right: -4px;
  bottom: 0;
  background-color: var(--blue-main);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: -1;
}

/* 종료 날짜: 오른쪽만 둥글게 */
.react-datepicker__day--range-end:not(.react-datepicker__day--range-start)::before {
  content: "";
  position: absolute;
  top: 0;
  left: -4px;
  right: -4px;
  bottom: 0;
  background-color: var(--blue-main);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  z-index: -1;
}

/* 단일 선택 시 */
.react-datepicker__day--range-start.react-datepicker__day--range-end {
  background-color: var(--blue-main);
  color: white;
  border-radius: 10px !important;
  z-index: 2;
}
.react-datepicker__day--range-start.react-datepicker__day--range-end::before {
  content: none !important;
}

`;

const Container = styled.div`
  display: flex;
  border-radius: 16px;
  width: 100%;
  margin-bottom: 30px;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export default function DateSelector() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>1. 날짜 선택</Title>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={ko}
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect={false}
          showPopperArrow={false}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                gap: "12px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                style={{ background: "none", border: "none", fontSize: "18px" }}
              >
                {"<"}
              </button>
              <span>{`${date.getFullYear()} ${date.getMonth() + 1}월`}</span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                style={{ background: "none", border: "none", fontSize: "18px" }}
              >
                {">"}
              </button>
            </div>
          )}
        />
      </Container>
    </>
  );
}
