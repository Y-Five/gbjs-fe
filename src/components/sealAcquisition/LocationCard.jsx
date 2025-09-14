import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../../pages/SealAcquisitionPage.module.css';
import {
  DEFAULT_LOCATION,
  MARKER_IMAGES,
  loadKakaoMapAPI,
  createMapOptions,
  createMarkerImage,
} from '../../utils/mapUtils';
import { getAddressFromCoordinates } from '../../utils/addressUtils';

const DEFAULT_ADDRESS = '위치 불러오는 중...';

const LocationCard = ({
  address,
  onLocationUpdate,
  onNearbySealsUpdate,
  onStickerSelect,
  geolocation,
  onLoadingChange,
}) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 현재 위치 마커 생성
  const createCurrentLocationMarker = (map, location = DEFAULT_LOCATION) => {
    if (!map) return;

    try {
      // 기존 마커 제거
      if (window.currentLocationMarker) {
        window.currentLocationMarker.setMap(null);
        window.currentLocationMarker = null;
      }

      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );

      const markerImage = createMarkerImage(MARKER_IMAGES.CURRENT_LOCATION);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
        image: markerImage,
      });

      window.currentLocationMarker = marker;
    } catch (error) {
      console.error('현재 위치 마커 생성 실패:', error);
    }
  };

  const createSealMarkers = useCallback(
    (map, stickers) => {
      // 기존 띠부씰 마커들 제거
      if (window.sealMarkers) {
        window.sealMarkers.forEach((marker) => marker.setMap(null));
      }

      window.sealMarkers = [];

      stickers.forEach((seal) => {
        const markerPosition = new window.kakao.maps.LatLng(
          seal.latitude,
          seal.longitude
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        const markerImage = createMarkerImage(MARKER_IMAGES.SEAL);

        marker.setImage(markerImage);

        // 마커 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'click', () => {
          onStickerSelect(seal);
        });

        window.sealMarkers.push(marker);
      });
    },
    [onStickerSelect]
  );

  const createMap = (location = DEFAULT_LOCATION) => {
    if (!mapRef.current) return;

    try {
      const options = createMapOptions(location);
      const map = new window.kakao.maps.Map(mapRef.current, options);
      window.mapInstance = map;

      createCurrentLocationMarker(map, location);
    } catch (error) {
      console.error('지도 생성 실패:', error);
    }
  };

  const fetchNearbySeals = useCallback(
    async (location = DEFAULT_LOCATION) => {
      try {
        // 로딩 시작
        if (onLoadingChange) {
          onLoadingChange(true);
        }

        const response = await fetch(
          `/api/seals/nearby?latitude=${location.lat}&longitude=${location.lng}`
        );

        if (!response.ok) {
          throw new Error('주변 띠부씰 조회 실패');
        }

        const data = await response.json();

        if (data.code === 'SUCCESS' && data.data?.nearbySeals) {
          // 부모 컴포넌트에 데이터 전달
          onNearbySealsUpdate(data.data.nearbySeals);

          // 기존 지도 인스턴스에 띠부씰 마커 추가
          if (window.mapInstance && window.kakao && window.kakao.maps) {
            try {
              createSealMarkers(window.mapInstance, data.data.nearbySeals);
            } catch (error) {
              console.error('띠부씰 마커 생성 실패:', error);
            }
          }
        }
      } catch (error) {
        console.error('주변 띠부씰 조회 실패:', error);
        onNearbySealsUpdate([]);
      } finally {
        // 로딩 종료
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }
    },
    [onNearbySealsUpdate, createSealMarkers, onLoadingChange]
  );

  const initializeMap = useCallback(
    (location = DEFAULT_LOCATION) => {
      if (!mapLoaded || !window.kakao || !window.kakao.maps) return;

      try {
        createMap(location);
      } catch (error) {
        console.error('지도 초기화 실패:', error);
      }
    },
    [mapLoaded]
  );

  useEffect(() => {
    const initializeMapAndData = async () => {
      try {
        await loadKakaoMapAPI();
        setMapLoaded(true);

        if (geolocation.loaded) {
          if (geolocation.error) {
            console.error('위치 정보 에러:', geolocation.error);
            onLocationUpdate('위치를 가져올 수 없습니다');
            initializeMap(DEFAULT_LOCATION);
            fetchNearbySeals(DEFAULT_LOCATION);
          } else if (
            geolocation.coordinates.lat &&
            geolocation.coordinates.lng
          ) {
            const currentLocation = {
              lat: geolocation.coordinates.lat,
              lng: geolocation.coordinates.lng,
            };

            // 주소 설정
            const addressParts = geolocation.address;
            const fullAddress =
              `${addressParts.province} ${addressParts.city} ${addressParts.district}`.trim();
            onLocationUpdate(fullAddress || '현재 위치');

            initializeMap(currentLocation);
            fetchNearbySeals(currentLocation);
          }
        }
      } catch (error) {
        console.error('지도 초기화 실패:', error);
        onLocationUpdate('지도를 불러올 수 없습니다');
      }
    };

    initializeMapAndData();
  }, [geolocation.loaded]);

  const handleRefreshLocation = async () => {
    try {
      // 로딩 시작
      setIsRefreshing(true);
      if (onLoadingChange) {
        onLoadingChange(true);
      }

      if (geolocation.coordinates.lat && geolocation.coordinates.lng) {
        const currentLocation = {
          lat: geolocation.coordinates.lat,
          lng: geolocation.coordinates.lng,
        };

        // 주소 새로고침
        const address = await getAddressFromCoordinates(
          currentLocation.lat,
          currentLocation.lng
        );
        onLocationUpdate(address);

        // 띠부씰 데이터 새로고침
        const sealsResponse = await fetch(
          `/api/seals/nearby?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}`
        );

        if (sealsResponse.ok) {
          const sealsData = await sealsResponse.json();

          if (sealsData.code === 'SUCCESS' && sealsData.data?.nearbySeals) {
            // 부모 컴포넌트에 데이터 전달
            onNearbySealsUpdate(sealsData.data.nearbySeals);

            // 기존 지도 인스턴스에 띠부씰 마커 추가
            if (window.mapInstance && window.kakao && window.kakao.maps) {
              try {
                createSealMarkers(
                  window.mapInstance,
                  sealsData.data.nearbySeals
                );
              } catch (error) {
                console.error('띠부씰 마커 생성 실패:', error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('위치 새로고침 실패:', error);
    } finally {
      // 로딩 종료
      setIsRefreshing(false);
      if (onLoadingChange) {
        onLoadingChange(false);
      }
    }
  };

  return (
    <div className={styles.locationCard}>
      <div className={styles.locationContent}>
        <div className={styles.locationHeader}>
          <h2 className={styles.locationTitle}>현재 내 위치</h2>
          <button
            className={`${styles.locationRefreshButton} ${
              isRefreshing ? styles.refreshing : ''
            }`}
            onClick={handleRefreshLocation}
            title="위치 새로고침"
            disabled={isRefreshing}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isRefreshing ? styles.rotating : ''}
            >
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <p className={styles.locationAddress}>{address}</p>
        <div className={styles.mapContainer}>
          <div
            ref={mapRef}
            className={styles.map}
            style={{ width: '100%', height: '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
