import { useState, useEffect, useRef } from 'react';
import { getAddressFromCoordinates } from '../utils/addressUtils';

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    address: {
      province: '', // 시/도
      city: '', // 시/군/구
      district: '', // 읍/면/동
    },
    error: null,
  });

  const hasInitialLocation = useRef(false); // 초기 위치를 가져왔는지 추적

  // OpenStreetMap Nominatim API를 사용하여 좌표를 주소로 변환
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const fullAddress = await getAddressFromCoordinates(latitude, longitude);

      // 주소를 컴포넌트로 분리
      const addressParts = fullAddress.split(' ');

      return {
        province: addressParts[0] || '',
        city: addressParts[1] || '',
        district: addressParts[2] || '',
      };
    } catch (error) {
      console.error('주소 변환 실패:', error);
      return {
        province: '',
        city: '',
        district: '',
      };
    }
  };

  const onSuccess = async (position) => {
    const { latitude, longitude } = position.coords;

    // 초기 로드 시에만 주소 변환 API 호출
    if (!hasInitialLocation.current) {
      const address = await getAddressFromCoords(latitude, longitude);

      setLocation({
        loaded: true,
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
        address,
        error: null,
      });
    } else {
      // 이미 주소가 있으면 주소 변환 API 호출하지 않음
      setLocation((prev) => ({
        ...prev,
        loaded: true,
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
        error: null,
      }));
    }

    hasInitialLocation.current = true; // 초기 위치 설정 완료
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: '', lng: '' },
      address: {
        province: '',
        city: '',
        district: '',
      },
      error: {
        code: error.code,
        message: error.message,
      },
    });

    hasInitialLocation.current = true; // 에러가 발생해도 초기 시도 완료로 간주
  };

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  useEffect(() => {
    requestLocation();

    // 권한 변경 감지
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permission) => {
          permission.addEventListener('change', () => {
            if (permission.state === 'granted' && !hasInitialLocation.current) {
              requestLocation();
            }
          });
        });
    }

    // 페이지 포커스 시 재시도 (권한 허용 후 돌아왔을 때만, 초기 위치가 없을 때만)
    const handleFocus = () => {
      if (
        document.visibilityState === 'visible' &&
        !hasInitialLocation.current
      ) {
        requestLocation();
      }
    };

    document.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return location;
};
