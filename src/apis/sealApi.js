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
