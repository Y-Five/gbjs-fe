import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import RegionSelector from "../components/sealTour/RegionSelector";
import { SavedCourseGuide, SavedCourseList } from "../components/savedCourse";
import { savedCourseService } from "../apis/savedCourse";
import styles from "./SavedCoursePage.module.css";

export default function SavedCoursePage() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [sortBy, setSortBy] = useState("LATEST");

  // 저장된 코스 목록 조회
  const fetchSavedCourses = async (locationNames = [], sortOrder = sortBy) => {
    setLoading(true);
    setError(null);

    try {
      const response = await savedCourseService.getSavedCourses(
        locationNames,
        sortOrder
      );

      if (response.code === "SUCCESS") {
        setSavedCourses(response.data?.courses || []);
      } else {
        setError("저장된 코스를 불러올 수 없습니다.");
      }
    } catch (err) {
      console.error("저장된 코스 조회 실패:", err);
      setError("저장된 코스를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    fetchSavedCourses();
  }, []);

  // 지역 선택 변경 시 코스 목록 필터링
  const handleRegionSelect = (selected) => {
    setSelectedLocations(selected);
    fetchSavedCourses(selected, sortBy);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    fetchSavedCourses(selectedLocations, newSortBy);
  };

  return (
    <div className={styles.savedCourseContainer}>
      <Header title="저장된 코스" isDark={true} />

      <div className={styles.content}>
        <SavedCourseGuide />
        <RegionSelector
          showTitle={false}
          selectedLocations={selectedLocations}
          onRegionSelect={handleRegionSelect}
          multiSelect={true}
        />
        <SavedCourseList
          courses={savedCourses}
          loading={loading}
          error={error}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
}
