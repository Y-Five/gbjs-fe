import BackHeader from "../components/header/BackHeader";
import MapPreview from "../components/courseDetail/MapPreview";
import DayTabs from "../components/courseDetail/DayTabs";
import ScheduleList from "../components/courseDetail/ScheduleList";
import SaveButton from "../components/courseDetail/SaveButton";
import StickerList from "../components/courseDetail/StickerList";

import styles from "./CourseDetailPage.module.css";
import { useState } from "react";

export default function CourseDetailPage() {
  const [selectedDay, setSelectedDay] = useState(1);

  const schedules = {
    1: [
      { id: 1, title: "월영교", type: "관광명소" },
      { id: 2, title: "안동 문화의 거리", type: "관광명소" },
      { id: 3, title: "안동 찜닭 골목", type: "음식점" },
      { id: 4, title: "탈춤공원 & 전통문화콘텐츠박물관", type: "테마/체험" },
      { id: 5, title: "안동민속촌", type: "관광명소" },
    ],
    2: [],
  };

  const stickers = [
    { title: "월영교", collected: true },
    { title: "안동 문화의 거리", collected: false },
  ];

  return (
    <>
      <BackHeader title="띠부씰 코스" />
      <div className={styles.main}>
        <MapPreview />
        <DayTabs selectedDay={selectedDay} onChange={setSelectedDay} />
        <ScheduleList day={selectedDay} schedules={schedules[selectedDay]} />
        <SaveButton />
        <StickerList stickers={stickers} />
      </div>
    </>
  );
}
