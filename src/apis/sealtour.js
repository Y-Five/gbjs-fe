import { APIService } from "./axios.js";

/**
 * 띠부씰 투어 API 서비스
 * 띠부씰 투어 관련 API 호출
 */
export const sealtourService = {
  /**
   * 코스 생성
   * @param {string} startDate - 시작 날짜 (YYYY-MM-DD)
   * @param {string} endDate - 종료 날짜 (YYYY-MM-DD)
   * @param {string[]} locations - 선택된 지역 목록
   * @returns {Promise} 코스 생성 응답
   */
  generateCourse: async (startDate, endDate, locations) => {
    try {
      const response = await APIService.private.post("/api/courses/generate", {
        startDate,
        endDate,
        locations,
      });
      return response;
    } catch (error) {
      console.error("코스 생성 실패:", error);
      throw error;
    }
  },

  /**
   * 인기 띠부씰 관광지 조회
   * @returns {Promise} 인기 관광지 목록 응답
   */
  getPopularSpots: async () => {
    try {
      const response = await APIService.private.get("/api/seals/popular-spots");
      return response;
    } catch (error) {
      console.error("인기 관광지 조회 실패:", error);
      throw error;
    }
  },

  /**
   * 띠부씰 상세 정보 조회
   * @param {number} sealSpotId - 띠부씰 ID
   * @returns {Promise} 띠부씰 상세 정보 응답
   */
  getSealDetail: async (sealSpotId) => {
    try {
      const response = await APIService.private.get(
        `/api/seals/spot/${sealSpotId}`
      );
      return response;
    } catch (error) {
      console.error("띠부씰 상세 정보 조회 실패:", error);
      throw error;
    }
  },

  /**
   * 지역별 띠부씰 목록 조회
   * @param {string} sortBy - 정렬 기준 (NUMBER, RARITY, LOCATION)
   * @param {Array} locationNames - 지역명 배열
   * @returns {Promise} 지역별 띠부씰 목록 응답
   */
  getSealsByLocation: async (sortBy = "NUMBER", locationNames = []) => {
    try {
      const response = await APIService.private.get("/api/seals/location", {
        params: {
          sortBy,
          locationNames,
        },
      });
      return response;
    } catch (error) {
      console.error("지역별 띠부씰 조회 실패:", error);
      throw error;
    }
  },

  /**
   * 코스 저장
   * @param {Object} courseData - 저장할 코스 데이터
   * @returns {Promise} 코스 저장 응답
   */
  saveCourse: async (courseData) => {
    try {
      // id를 제외한 데이터만 전송
      const saveData = { ...courseData };
      delete saveData.id;
      const response = await APIService.private.post("/api/courses", saveData);
      return response;
    } catch (error) {
      console.error("코스 저장 실패:", error);
      throw error;
    }
  },
};

export default {
  sealtourService,
};
