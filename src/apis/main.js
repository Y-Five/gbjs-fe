import { APIService } from "./axios.js";

/**
 * 날씨 API 서비스
 * 현재 위치의 날씨 정보를 가져오는 API 호출
 */
export const weatherService = {
  /**
   * 현재 위치의 날씨 정보 조회
   * @param {number} longitude - 경도
   * @param {number} latitude - 위도
   * @returns {Promise} 날씨 정보 응답
   */
  getWeather: async (longitude, latitude) => {
    try {
      const response = await APIService.private.get("/api/weathers", {
        params: {
          longitude,
          latitude,
        },
      });
      return response;
    } catch (error) {
      console.error("날씨 정보 조회 실패:", error);
      throw error;
    }
  },
};

/**
 * 축제 API 서비스
 * 특정 지역의 축제 정보를 가져오는 API 호출
 */
export const festivalService = {
  /**
   * 특정 지역의 축제 목록 조회
   * @param {string} region - 시군구 이름
   * @param {number} pageNum - 페이지 번호 (기본값: 1)
   * @param {number} pageSize - 페이지 크기 (기본값: 3)
   * @returns {Promise} 축제 목록 응답
   */
  getFestivals: async (region, pageNum = 1, pageSize = 3) => {
    try {
      const response = await APIService.private.get("/api/festivals", {
        params: {
          region,
          pageNum,
          pageSize,
        },
      });
      return response;
    } catch (error) {
      console.error("축제 정보 조회 실패:", error);
      throw error;
    }
  },

  /**
   * 축제 상세 정보 조회
   * @param {string} contentid - 축제 ID
   * @returns {Promise} 축제 상세 정보 응답
   */
  getFestivalDetail: async (contentid) => {
    try {
      const response = await APIService.private.get(
        `/api/festivals/${contentid}`
      );
      return response;
    } catch (error) {
      console.error("축제 상세 정보 조회 실패:", error);
      throw error;
    }
  },
};

/**
 * 전통상품 API 서비스
 * 전통상품 정보를 가져오는 API 호출
 */
export const traditionService = {
  /**
   * 전통상품 목록 조회
   * @param {string} type - 상품 타입 (ACTIVITY: 체험형, SPECIALTIES: 기념품)
   * @param {number} pageNum - 페이지 번호 (기본값: 1)
   * @param {number} pageSize - 페이지 크기 (기본값: 3)
   * @returns {Promise} 전통상품 목록 응답
   */
  getTraditions: async (type, pageNum = 1, pageSize = 3) => {
    try {
      const response = await APIService.private.get("/api/traditions", {
        params: {
          type,
          pageNum,
          pageSize,
        },
      });
      return response;
    } catch (error) {
      console.error("전통상품 정보 조회 실패:", error);
      throw error;
    }
  },
};

export default {
  weatherService,
  festivalService,
  traditionService,
};
