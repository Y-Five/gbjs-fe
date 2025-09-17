// 쿠키에서 토큰 가져오는 함수
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// 로그인 상태 확인 함수
export const checkLoginStatus = () => {
  const accessToken = getCookie('ACCESS_TOKEN');
  const refreshToken = getCookie('REFRESH_TOKEN');
  return !!(accessToken || refreshToken);
};
