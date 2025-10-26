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
    // 실제 사용자 위치 사용
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

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

  const onError = async (error) => {
    console.error('위치 정보 가져오기 실패:', error);

    // 위치 권한이 거부되거나 오류가 발생한 경우 fallback 좌표 사용
    const latitude = 36.925135; // 경주시 좌표 (fallback)
    const longitude = 128.580307;

    const address = await getAddressFromCoords(latitude, longitude);

    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      address,
      error: {
        code: error.code,
        message: error.message || '위치 정보를 가져올 수 없습니다.',
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

    // 이미 위치를 가져왔으면 재시도하지 않음
    if (hasInitialLocation.current) {
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000, // 10초로 증가
      maximumAge: 300000, // 5분간 캐시 사용
    });
  };

  useEffect(() => {
    requestLocation();

    // 권한 변경 감지 (Safari에서 제한적 지원)
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permission) => {
          permission.addEventListener('change', () => {
            // 권한이 허용되었고 아직 위치를 가져오지 못한 경우에만 재시도
            if (permission.state === 'granted' && !hasInitialLocation.current) {
              requestLocation();
            }
          });
        })
        .catch((error) => {
          // permissions API가 지원되지 않는 경우 무시
          console.warn('Permissions API not supported:', error);
        });
    }

    // 페이지 포커스 시 재시도 (권한 허용 후 돌아왔을 때만, 초기 위치가 없을 때만)
    const handleFocus = () => {
      if (
        document.visibilityState === 'visible' &&
        !hasInitialLocation.current
      ) {
        // 짧은 지연 후 재시도 (권한 허용 후 돌아온 경우를 위해)
        setTimeout(() => {
          if (!hasInitialLocation.current) {
            requestLocation();
          }
        }, 1000);
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
