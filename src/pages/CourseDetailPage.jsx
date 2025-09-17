import BackHeader from "../components/header/BackHeader";
import MapPreview from "../components/courseDetail/MapPreview";
import DayTabs from "../components/courseDetail/DayTabs";
import ScheduleList from "../components/courseDetail/ScheduleList";
import SaveButton from "../components/courseDetail/SaveButton";
import StickerList from "../components/courseDetail/StickerList";
import { sealtourService } from "../apis/sealtour";
import { savedCourseService } from "../apis/savedCourse";

import styles from "./CourseDetailPage.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function CourseDetailPage({
  headerTitle: propHeaderTitle = "경북씰 코스",
  showSaveButton: propShowSaveButton = true,
}) {
  const location = useLocation();
  const state = location.state || {};

  // state에서 props 가져오기 (저장된 코스에서 온 경우)
  const finalHeaderTitle = state.headerTitle || propHeaderTitle;
  const finalShowSaveButton =
    state.showSaveButton !== undefined
      ? state.showSaveButton
      : propShowSaveButton;
  const showRegenerateButton =
    state.showRegenerateButton !== undefined
      ? state.showRegenerateButton
      : true;
  const [selectedDay, setSelectedDay] = useState(1);
  const [courseData, setCourseData] = useState(null);
  const [schedules, setSchedules] = useState({});
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [originalParams, setOriginalParams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 코스 데이터 처리 함수
  const processCourseData = (data) => {
    setCourseData(data);

    // API 응답 데이터를 schedules 형식으로 변환
    if (data.dailyCourses) {
      const formattedSchedules = {};
      data.dailyCourses.forEach((dailyCourse) => {
        formattedSchedules[dailyCourse.dayNumber] = dailyCourse.spots.map(
          (spot) => ({
            id: spot.spotId,
            title: spot.name,
            type: spot.category,
            visitOrder: spot.visitOrder,
            addr1: spot.addr1,
            latitude: spot.latitude,
            longitude: spot.longitude,
            isSealSpot: spot.isSealSpot,
            sealSpotId: spot.sealSpotId,
          })
        );
      });
      setSchedules(formattedSchedules);
    }
  };

  // localStorage에서 코스 데이터와 원본 파라미터 로드 또는 API 호출
  useEffect(() => {
    const loadCourseData = async () => {
      // courseId가 있으면 API 호출
      if (state.courseId) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await savedCourseService.getPublicCourseDetail(
            state.courseId
          );

          if (response.code === "SUCCESS") {
            // 코스 데이터를 localStorage에 저장
            localStorage.setItem("courseData", JSON.stringify(response.data));
            processCourseData(response.data);
          } else {
            setError("코스 정보를 불러올 수 없습니다.");
          }
        } catch (error) {
          console.error("코스 상세 조회 실패:", error);
          setError("코스 정보를 불러올 수 없습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        // localStorage에서 데이터 로드
        const savedCourseData = localStorage.getItem("courseData");

        if (savedCourseData) {
          try {
            const data = JSON.parse(savedCourseData);
            processCourseData(data);
          } catch (error) {
            console.error("코스 데이터 파싱 실패:", error);
            setError("저장된 코스 데이터를 불러올 수 없습니다.");
          }
        }
      }

      // 원본 파라미터 로드
      const savedParams = localStorage.getItem("courseParams");
      if (savedParams) {
        try {
          const params = JSON.parse(savedParams);
          setOriginalParams(params);
        } catch (error) {
          console.error("코스 파라미터 파싱 실패:", error);
        }
      }
    };

    loadCourseData();
  }, [state.courseId]);

  // 코스 재생성 함수
  const handleRegenerate = async () => {
    if (!originalParams) {
      alert("재생성할 수 없습니다. 다시 코스를 생성해주세요.");
      return;
    }

    setIsRegenerating(true);
    try {
      const response = await sealtourService.generateCourse(
        originalParams.startDate,
        originalParams.endDate,
        originalParams.locations
      );

      if (response.code === "SUCCESS") {
        // 새로운 코스 데이터를 localStorage에 저장
        localStorage.setItem("courseData", JSON.stringify(response.data));

        // 페이지 새로고침하여 새로운 데이터 로드
        window.location.reload();
      } else {
        alert("코스 재생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("코스 재생성 실패:", error);
      alert("코스 재생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsRegenerating(false);
    }
  };

  // 사용할 데이터 결정
  const currentSchedules = schedules;

  // 로딩 스피너 컴포넌트
  const LoadingSpinner = () => (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>코스 정보를 불러오는 중...</p>
    </div>
  );

  // 에러 컴포넌트
  const ErrorMessage = () => (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{error}</p>
      <button
        className={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        다시 시도
      </button>
    </div>
  );

  return (
    <>
      <BackHeader title={finalHeaderTitle} />
      <div className={styles.main}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : courseData ? (
          <>
            <MapPreview courseData={courseData} selectedDay={selectedDay} />
            <DayTabs
              selectedDay={selectedDay}
              onChange={setSelectedDay}
              courseData={courseData}
            />
            <ScheduleList
              day={selectedDay}
              schedules={currentSchedules[selectedDay] || []}
              courseData={courseData}
              onRegenerate={showRegenerateButton ? handleRegenerate : null}
              isRegenerating={isRegenerating}
            />
            {finalShowSaveButton && <SaveButton courseData={courseData} />}
            <StickerList selectedDay={selectedDay} courseData={courseData} />
          </>
        ) : (
          <div className={styles.noDataContainer}>
            <p className={styles.noDataText}>코스 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}

CourseDetailPage.propTypes = {
  headerTitle: PropTypes.string,
  showSaveButton: PropTypes.bool,
};
