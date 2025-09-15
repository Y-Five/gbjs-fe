import { APIService } from "./axios.js";

/**
 * 저장된 코스 API 서비스
 * 저장된 코스 관련 API 호출
 */
export const savedCourseService = {
  /**
   * 사용자의 저장된 코스 목록 조회
   * @param {Array} locationNames - 지역명 배열 (선택사항)
   * @param {string} sortBy - 정렬 기준 (LATEST, OLDEST)
   * @returns {Promise} 저장된 코스 목록 응답
   */
  getSavedCourses: async (locationNames = [], sortBy = "LATEST") => {
    try {
      const response = await APIService.private.get("/api/courses/users", {
        params: {
          locationNames,
          sortBy,
        },
      });
      return response;
    } catch (error) {
      console.error("저장된 코스 조회 실패:", error);
      throw error;
    }
  },

  /**
   * 저장된 코스 상세 정보 조회
   * @param {number} courseId - 코스 ID
   * @returns {Promise} 코스 상세 정보 응답
   */
  getSavedCourseDetail: async (courseId) => {
    try {
      const response = await APIService.private.get(`/api/courses/${courseId}`);
      return response;
    } catch (error) {
      console.error("저장된 코스 상세 조회 실패:", error);
      throw error;
    }
  },
};

export default {
  savedCourseService,
};
