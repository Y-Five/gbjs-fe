import { useState, useEffect } from 'react';
import { getCookie } from '../utils/authUtils';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = () => {
    const accessToken = getCookie('ACCESS_TOKEN');
    const refreshToken = getCookie('REFRESH_TOKEN');
    const loginStatus = !!(accessToken || refreshToken);
    setIsLoggedIn(loginStatus);
    return loginStatus;
  };

  useEffect(() => {
    // 초기 로그인 상태 확인
    checkLoginStatus();
    setIsLoading(false);
  }, []);

  return {
    isLoggedIn,
    isLoading,
    checkLoginStatus,
  };
};
