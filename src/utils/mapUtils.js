// 상수
export const DEFAULT_LOCATION = { lat: 36.5759985, lng: 128.505832 };

// 마커 이미지 SVG (Base64)
export const MARKER_IMAGES = {
  CURRENT_LOCATION:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCAyMiAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExIDE0LjcyNUM5Ljk1ODA4IDE0LjcyNSA4Ljk1ODgzIDE0LjMxNjcgOC4yMjIwOCAxMy41OUM3LjQ4NTMzIDEyLjg2MzMgNy4wNzE0MyAxMS44Nzc3IDcuMDcxNDMgMTAuODVDNy4wNzE0MyA5LjgyMjI5IDcuNDg1MzMgOC44MzY2NiA4LjIyMjA4IDguMTA5OTZDOC45NTg4MyA3LjM4MzI2IDkuOTU4MDggNi45NzUgMTEgNi45NzVDMTIuMDQxOSA2Ljk3NSAxMy4wNDEyIDcuMzgzMjYgMTMuNzc3OSA4LjEwOTk2QzE0LjUxNDcgOC44MzY2NiAxNC45Mjg2IDkuODIyMjkgMTQuOTI4NiAxMC44NUMxNC45Mjg2IDExLjM1ODkgMTQuODI3IDExLjg2MjggMTQuNjI5NSAxMi4zMzI5QzE0LjQzMjEgMTIuODAzIDE0LjE0MjcgMTMuMjMwMiAxMy43Nzc5IDEzLjU5QzEzLjQxMzEgMTMuOTQ5OSAxMi45OCAxNC4yMzUzIDEyLjUwMzQgMTQuNDMwQzEyLjAyNjggMTQuNjI0OCAxMS41MTU5IDE0LjcyNSAxMSAxNC43MjVaTTExIDBDOC4wODI2MiAwIDUuMjg0NzMgMS4xNDMxMiAzLjIyMTgzIDMuMTc3ODlDMS4xNTg5MyA1LjIxMjY2IDAgNy45NzI0IDAgMTAuODVDMCAxOC45ODc1IDExIDMxIDExIDMxQzExIDMxIDIyIDE4Ljk4NzUgMjIgMTAuODVDMjIgNy45NzI0IDIwLjg0MTEgNS4yMTI2NiAxOC43NzgyIDMuMTc3ODlDMTYuNzE1MyAxLjE0MzEyIDEzLjkxNzQgMCAxMSAwWiIgZmlsbD0iI0ZGMEY2NyIvPgo8L3N2Zz4K',
  SEAL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCAyMiAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExIDE0LjcyNUM5Ljk1ODA4IDE0LjcyNSA4Ljk1ODgzIDE0LjMxNjcgOC4yMjIwOCAxMy41OUM3LjQ4NTMzIDEyLjg2MzMgNy4wNzE0MyAxMS44Nzc3IDcuMDcxNDMgMTAuODVDNy4wNzE0MyA5LjgyMjI5IDcuNDg1MzMgOC44MzY2NiA4LjIyMjA4IDguMTA5OTZDOC45NTg4MyA3LjM4MzI2IDkuOTU4MDggNi45NzUgMTEgNi45NzVDMTIuMDQxOSA2Ljk3NSAxMy4wNDEyIDcuMzgzMjYgMTMuNzc3OSA4LjEwOTk2QzE0LjUxNDcgOC44MzY2NiAxNC45Mjg2IDkuODIyMjkgMTQuOTI4NiAxMC44NUMxNC45Mjg2IDExLjM1ODkgMTQuODI3IDExLjg2MjggMTQuNjI5NSAxMi4zMzI5QzE0LjQzMjEgMTIuODAzIDE0LjE0MjcgMTMuMjMwMiAxMy43Nzc5IDEzLjU5QzEzLjQxMzEgMTMuOTQ5OSAxMi45OCAxNC4yMzUzIDEyLjUwMzQgMTQuNDMwQzEyLjAyNjggMTQuNjI0OCAxMS41MTU5IDE0LjcyNSAxMSAxNC43MjVaTTExIDBDOC4wODI2MiAwIDUuMjg0NzMgMS4xNDMxMiAzLjIyMTgzIDMuMTc3ODlDMS4xNTg5MyA1LjIxMjY2IDAgNy45NzI0IDAgMTAuODVDMCAxOC45ODc1IDExIDMxIDExIDMxQzExIDMxIDIyIDE4Ljk4NzUgMjIgMTAuODVDMjIgNy45NzI0IDIwLjg0MTEgNS4yMTI2NiAxOC43NzgyIDMuMTc3ODlDMTYuNzE1MyAxLjE0MzEyIDEzLjkxNzQgMCAxMSAwWiIgZmlsbD0iIzJEQThFNyIvPgo8L3N2Zz4K',
};

/**
 * 카카오 지도 API 로드 함수
 * @returns {Promise} API 로드 완료 Promise
 */
export const loadKakaoMapAPI = () => {
  return new Promise((resolve) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const checkReady = () => {
      if (window.kakao && window.kakao.maps) {
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
};

/**
 * 카카오 지도 옵션 생성
 * @param {Object} location - 위치 정보 {lat, lng}
 * @returns {Object} 카카오 지도 옵션
 */
export const createMapOptions = (location) => ({
  center: new window.kakao.maps.LatLng(location.lat, location.lng),
  level: 3,
  draggable: true,
  zoomable: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  disableDoubleTapZoom: false,
  disableTwoFingerTapZoom: false,
  zoomControl: true,
  zoomControlOptions: {
    position: window.kakao.maps.ControlPosition.TOPRIGHT,
  },
});

/**
 * 마커 이미지 생성
 * @param {string} imageData - Base64 이미지 데이터
 * @param {number} width - 마커 너비
 * @param {number} height - 마커 높이
 * @returns {Object} 카카오 마커 이미지 객체
 */
export const createMarkerImage = (imageData, width = 22, height = 31) => {
  return new window.kakao.maps.MarkerImage(
    imageData,
    new window.kakao.maps.Size(width, height)
  );
};
