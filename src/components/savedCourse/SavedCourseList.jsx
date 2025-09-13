import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SavedCourseList.module.css";
import { savedCourseService } from "../../apis/savedCourse";

export default function SavedCourseList({
  courses = [],
  loading = false,
  error = null,
}) {
  const [sortOrder, setSortOrder] = useState("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // API 응답 데이터를 UI 형식으로 변환
  const transformedCourses = courses.map((course) => ({
    id: course.id,
    title: course.title,
    date: course.startDate,
    stampCount: course.userCollectedSeals,
    totalStamps: course.totalCollectableSeals,
    locations: course.locations,
    totalDays: course.totalDays,
  }));
  // const savedCourses = [
  //   {
  //     id: 1,
  //     stampCount: 3,
  //     totalStamps: 5,
  //     title: '6월 24일 안동,의성,영천 코스',
  //     date: '2024-06-24'
  //   },
  //   {
  //     id: 2,
  //     stampCount: 0,
  //     totalStamps: 5,
  //     title: '6월 24일 안동,의성,영천 코스',
  //     date: '2024-06-24'
  //   },
  //   {
  //     id: 3,
  //     stampCount: 1,
  //     totalStamps: 5,
  //     title: '6월 24일 안동,의성,영천 코스',
  //     date: '2024-06-24'
  //   }
  // ];

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된순" },
    { value: "name", label: "이름순" },
  ];

  const handleSortChange = (value) => {
    setSortOrder(value);
    setIsDropdownOpen(false);
  };

  const handleCourseClick = async (courseId) => {
    try {
      // 코스 상세 정보 조회
      const response = await savedCourseService.getSavedCourseDetail(courseId);

      if (response.code === "SUCCESS") {
        // 코스 데이터를 localStorage에 저장
        localStorage.setItem("courseData", JSON.stringify(response.data));

        // CourseDetailPage로 이동 (재생성 버튼과 저장 버튼 숨김)
        navigate("/course", {
          state: {
            headerTitle: "코스 상세보기",
            showSaveButton: false,
            showRegenerateButton: false,
          },
        });
      } else {
        alert("코스 정보를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("코스 상세 조회 실패:", error);
      alert("코스 정보를 불러올 수 없습니다.");
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className={styles.listSection}>
        <div className={styles.loading}>저장된 코스를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={styles.listSection}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.listSection}>
      <div className={styles.listHeader}>
        <h3 className={styles.listTitle}>
          총{" "}
          <span className={styles.countNumber}>
            {transformedCourses.length}
          </span>
          건
        </h3>
        <div className={styles.sortContainer}>
          <button
            className={styles.sortButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find((option) => option.value === sortOrder)?.label}
            <svg
              width="19"
              height="19"
              viewBox="0 0 12 8"
              className={`${styles.dropdownArrow} ${
                isDropdownOpen ? styles.rotated : ""
              }`}
            >
              <path
                stroke="#A8A8A8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3L6 6L9 3"
                fill="none"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className={styles.sortDropdown}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.sortOption} ${
                    sortOrder === option.value ? styles.active : ""
                  }`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.courseList}>
        {transformedCourses.length > 0 ? (
          transformedCourses.map((course) => (
            <div
              key={course.id}
              className={styles.courseItem}
              onClick={() => handleCourseClick(course.id)}
            >
              <div className={styles.courseInfo}>
                <div className={styles.stampInfo}>
                  <span className={styles.stampLabel}>수집한 스탬프:</span>
                  <span className={styles.stampCount}>
                    {course.stampCount}/{course.totalStamps}
                  </span>
                </div>
                <div className={styles.courseTitleContainer}>
                  <h4 className={styles.courseTitle}>{course.title}</h4>
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    className={styles.arrowIcon}
                  >
                    <path
                      d="M1.5 1L6.5 6L1.5 11"
                      stroke="#5E5E5E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <p className={styles.emptyTitle}>저장된 코스가 없습니다.</p>
              <p className={styles.emptyDescription}>
                스탬프 지도에서 나만의 코스를 만들어보세요.
              </p>
              <button
                className={styles.emptyButton}
                onClick={() => navigate("/sealtour")}
              >
                스탬프 지도로 이동하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SavedCourseList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
