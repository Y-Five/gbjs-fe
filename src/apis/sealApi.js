import { APIService } from './axios';

// 띠부씰 상품 목록 조회
export async function getSealProducts() {
  try {
    const response = await APIService.private.get('/api/seals/products');
    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('Seal products API Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      },
    });
    throw error;
  }
}

// 로그인 상태 확인 함수
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// 전체 띠부씰 조회 (로그인 상태에 따라 다른 엔드포인트 사용)
export async function getAllSeals(sortBy = 'NUMBER') {
  try {
    const accessToken = getCookie('ACCESS_TOKEN');
    const endpoint = accessToken ? '/api/seals/user' : '/api/seals';

    const response = await APIService.private.get(endpoint, {
      params: { sortBy },
    });

    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('All seals API Error details:', {
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

// 회원 띠부씰 조회
export async function getUserSeals(sortBy = 'NUMBER') {
  try {
    const response = await APIService.private.get('/api/seals/user', {
      params: { sortBy },
    });

    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('User seals API Error details:', {
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

// 띠부씰 획득
export async function collectSeal(sealId, latitude, longitude) {
  try {
    const response = await APIService.private.post('/api/seals/collect', null, {
      params: { sealId, latitude, longitude },
    });

    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('Collect seal API Error details:', {
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

// 근처 띠부씰 조회
export async function getNearbySeals(latitude, longitude) {
  try {
    const response = await APIService.private.get('/api/seals/nearby', {
      params: { latitude, longitude },
    });

    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('Nearby seals API Error details:', {
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
