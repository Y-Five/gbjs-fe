import { APIService } from './axios';

export async function getSpotList(
  pageNum = 1,
  pageSize = 10,
  keyword,
  sortBy = 'DISTANCE',
  searchBy = null,
  latitude = 36.5759985,
  longitude = 128.505832
) {
  try {
    const allowedSortBy = ['DISTANCE', 'ABC'];
    const validSortBy = allowedSortBy.includes(sortBy) ? sortBy : 'DISTANCE';

    const params = {
      pageNum,
      pageSize,
      sortBy: validSortBy,
      latitude,
      longitude,
    };

    if (keyword && keyword.trim()) {
      params.keyword = keyword;
    } else {
      return {
        content: [],
        totalElements: 0,
        last: true,
        pageNum: pageNum - 1,
      };
    }

    if (searchBy) {
      params.searchBy = searchBy;
    }

    const response = await APIService.private.get('/api/spots', { params });
    return response?.data ?? response;
  } catch (error) {
    console.error('API Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        params: error.config?.params,
        method: error.config?.method,
      },
    });
    throw error;
  }
}

export async function getSpotById(
  contentId,
  latitude = 36.5759985,
  longitude = 128.505832
) {
  try {
    const params = {
      latitude,
      longitude,
    };

    const response = await APIService.private.get(`/api/spots/${contentId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('API Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        params: error.config?.params,
        method: error.config?.method,
      },
    });
    throw error;
  }
}

// 근처 음성 가이드 관광지 조회
export async function getNearbyAudioGuides(
  latitude = 36.5759985,
  longitude = 128.505832
) {
  try {
    const params = {
      latitude,
      longitude,
    };

    const response = await APIService.private.get(
      '/api/spots/audio-guides/nearby',
      {
        params,
      }
    );
    return response?.data ?? response;
  } catch (error) {
    console.error('Nearby audio guides API Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        params: error.config?.params,
        method: error.config?.method,
      },
    });
    throw error;
  }
}
