import { DAY_NAMES } from "../constants/chatConstants";

export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = DAY_NAMES[today.getDay()];
  return `${year}년 ${month.toString().padStart(2, '0')}월 ${date.toString().padStart(2, '0')}일 (${day})`;
};

export const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${ampm} ${formattedHours}:${formattedMinutes}`;
};