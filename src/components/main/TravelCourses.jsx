import { useState, useEffect } from "react";
import CourseCardSectionMain from "../global/CourseCardSectionMain";
import { courseService } from "../../apis/main";

export default function TravelCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["테마별 코스", "행사별 코스"];
  const typeMap = {
    0: "THEME", // 테마별 코스
    1: "FESTIVAL", // 행사별 코스
  };

  // 탭 변경 시 API 호출
  const handleTabChange = async (tabIndex) => {
    setActiveTab(tabIndex);
    setLoading(true);
    setError(null);

    try {
      const type = typeMap[tabIndex];
      const response = await courseService.getRecommendCourses(type);

      if (response.code === "SUCCESS") {
        // API 응답을 CourseCardSection 형식으로 변환
        const transformedCourses =
          response.data?.map((course) => ({
            id: course.courseId,
            image: course.imageUrl || course.image,
            name: course.title || course.name,
            location: course.location || course.region,
            locationName: course.locationName,
          })) || [];

        setCourses(transformedCourses);
      } else {
        setError("코스 정보를 불러올 수 없습니다.");
      }
    } catch (err) {
      console.error("추천 코스 조회 실패:", err);
      setError("코스 정보를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 첫 번째 탭 데이터 로드
  useEffect(() => {
    handleTabChange(0);
  }, []);

  return (
    <CourseCardSectionMain
      title="여행코스"
      sub="원하는 코스를 골라 아름다운 경북을 여행하세요."
      tabs={tabs}
      cards={courses}
      loading={loading}
      error={error}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
}
