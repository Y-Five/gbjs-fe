/**
 * OpenStreetMap API 응답에서 주소를 파싱하는 함수
 * @param {Object} addressData - OpenStreetMap API 응답 데이터
 * @returns {string} 파싱된 주소 문자열
 */
export const parseAddressFromNominatim = (addressData) => {
  const addressComponents = addressData.address || {};

  let province = '';
  let city = '';
  let district = '';

  if (
    addressComponents.city &&
    (addressComponents.city.includes('특별시') ||
      addressComponents.city.includes('광역시'))
  ) {
    province = addressComponents.city;
    city = addressComponents.borough || addressComponents.county || '';
    district = addressComponents.suburb || '';
  } else {
    province = addressComponents.province || addressComponents.state || '';
    city = addressComponents.city || addressComponents.county || '';
    district = addressComponents.suburb || '';
  }

  // 주소 접미사 추가
  if (
    province &&
    !province.includes('도') &&
    !province.includes('특별시') &&
    !province.includes('광역시')
  ) {
    province = province + '도';
  }
  if (
    city &&
    !city.includes('시') &&
    !city.includes('군') &&
    !city.includes('구')
  ) {
    city = city + '시';
  }

  return `${province} ${city} ${district}`.trim();
};

/**
 * 좌표로부터 주소를 가져오는 함수
 * @param {number} lat - 위도
 * @param {number} lng - 경도
 * @returns {Promise<string>} 주소 문자열
 */
export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ko`
    );

    if (!response.ok) {
      throw new Error('주소 조회 실패');
    }

    const data = await response.json();
    return parseAddressFromNominatim(data) || '현재 위치';
  } catch (error) {
    console.error('주소 조회 실패:', error);
    return '현재 위치';
  }
};
