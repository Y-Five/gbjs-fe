import { useState, useCallback, useEffect } from 'react';
import Header from '../components/header/Header';
import {
  NotificationCard,
  LocationCard,
  NearbySection,
  AcquireModal,
} from '../components/sealAcquisition';
import { AlertModal } from '../components/global';
import { useGeolocation } from '../hooks/useGeolocation';
import { useAuth } from '../hooks/useAuth';
import { getUserSeals, collectSeal, getNearbySeals } from '../apis/sealApi';
import styles from './SealAcquisitionPage.module.css';

// 상수
const DEFAULT_ADDRESS = '위치 불러오는 중...';

export default function SealAcquisitionPage() {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [stickers, setStickers] = useState([]);
  const [showAcquireModal, setShowAcquireModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [acquiring, setAcquiring] = useState(false);
  const [acquireSuccess, setAcquireSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // useGeolocation 훅 사용
  const geolocation = useGeolocation();
  const { isLoggedIn, isLoading: authLoading } = useAuth();

  const handleLocationUpdate = useCallback((newAddress) => {
    setAddress(newAddress);
  }, []);

  const handleNearbySealsUpdate = useCallback(
    async (newStickers) => {
      // 로그인 상태 확인이 완료되고 로그인된 경우에만 사용자의 수집 현황을 가져와서 근처 스티커와 비교
      if (!authLoading && isLoggedIn) {
        try {
          const data = await getUserSeals('NUMBER');
          const userSeals = data?.data?.seals || data?.seals || [];

          // 근처 스티커에 수집 상태 추가
          const stickersWithCollectionStatus = newStickers.map((sticker) => ({
            ...sticker,
            collected: userSeals.some(
              (userSeal) => userSeal.id === sticker.sealId
            ),
          }));

          setStickers(stickersWithCollectionStatus);
          return;
        } catch (error) {
          console.error('사용자 수집 현황 조회 실패:', error);
        }
      }

      // 로그인되지 않았거나 API 호출 실패 시 원본 데이터 사용
      setStickers(newStickers);
    },
    [isLoggedIn, authLoading]
  );

  const handleStickerClick = useCallback((sticker) => {
    setSelectedSticker(sticker);
    setShowAcquireModal(true);
  }, []);

  const handleAcquire = async () => {
    if (!selectedSticker) return;

    try {
      setAcquiring(true);
      setAcquireSuccess(false);

      // 현재 위치 정보 가져오기
      const currentLocation =
        geolocation.coordinates.lat && geolocation.coordinates.lng
          ? {
              lat: geolocation.coordinates.lat,
              lng: geolocation.coordinates.lng,
            }
          : { lat: 36.5759985, lng: 128.505832 };

      // 획득 API 호출
      const data = await collectSeal(
        selectedSticker.sealId,
        currentLocation.lat,
        currentLocation.lng
      );

      if (data.code === 'SUCCESS' && data.data?.success) {
        // 성공 모션 표시
        setAcquireSuccess(true);

        // 5초 후 모달 닫고 완료 모달 표시
        setTimeout(async () => {
          setShowAcquireModal(false);
          setShowCompletionModal(true);
          setAcquiring(false);
          setAcquireSuccess(false);

          // 획득 성공 후 근처 스티커 수집 상태 새로고침
          if (geolocation.coordinates.lat && geolocation.coordinates.lng) {
            const currentLocation = {
              lat: geolocation.coordinates.lat,
              lng: geolocation.coordinates.lng,
            };

            // 근처 스티커 다시 가져오기
            try {
              const data = await getNearbySeals(
                currentLocation.lat,
                currentLocation.lng
              );
              if (data.code === 'SUCCESS' && data.data?.nearbySeals) {
                handleNearbySealsUpdate(data.data.nearbySeals);
              }
            } catch (error) {
              console.error('근처 스티커 새로고침 실패:', error);
            }
          }
        }, 5000);
      } else {
        // 실패 모션 표시 (회전 애니메이션 유지)
        setAcquireSuccess(false);

        // 5초 후 에러 모달 표시
        setTimeout(() => {
          setAcquiring(false);

          // 거리별 에러 메시지 설정
          const distance = selectedSticker.distance;
          const isUlleungdo =
            selectedSticker.location_name?.includes('울릉') ||
            selectedSticker.spot_name?.includes('울릉');

          let errorMsg = data.message;
          if (!errorMsg) {
            if (isUlleungdo) {
              errorMsg = '울릉군은 2km 이내에서 다시 시도해주세요.';
            } else {
              errorMsg = '500m 이내에서 다시 시도해주세요.';
            }
          }

          setErrorMessage(errorMsg);
          setShowErrorModal(true);
        }, 5000);
      }
    } catch (error) {
      console.error('획득 API 호출 실패:', error);

      // 실패 모션 표시 (회전 애니메이션 유지)
      setAcquireSuccess(false);

      // 5초 후 에러 모달 표시
      setTimeout(() => {
        setAcquiring(false);

        // 거리별 에러 메시지 설정
        const distance = selectedSticker.distance;
        const isUlleungdo =
          selectedSticker.location_name?.includes('울릉') ||
          selectedSticker.spot_name?.includes('울릉');

        let errorMsg = '획득에 실패했습니다. ';
        if (isUlleungdo) {
          errorMsg += '울릉군은 2km 이내에서 다시 시도해주세요.';
        } else {
          errorMsg += '500m 이내에서 다시 시도해주세요.';
        }

        setErrorMessage(errorMsg);
        setShowErrorModal(true);
      }, 5000);
    }
  };

  const handleCompletionConfirm = () => {
    setShowCompletionModal(false);
    // 획득 완료 후 처리 로직
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const formatDistance = useCallback((distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)}km`;
    }
    return `${distance}m`;
  }, []);

  return (
    <div className={styles.page}>
      <Header title="경북씰 획득" isDark={true} />

      <main className={styles.main}>
        <NotificationCard />

        <LocationCard
          address={address}
          onLocationUpdate={handleLocationUpdate}
          onNearbySealsUpdate={handleNearbySealsUpdate}
          onStickerSelect={handleStickerClick}
          geolocation={geolocation}
        />

        <NearbySection
          stickers={stickers}
          onStickerClick={handleStickerClick}
          formatDistance={formatDistance}
        />
      </main>

      <AcquireModal
        showModal={showAcquireModal}
        selectedSticker={selectedSticker}
        onClose={() => setShowAcquireModal(false)}
        onAcquire={handleAcquire}
        acquiring={acquiring}
        acquireSuccess={acquireSuccess}
      />

      <AlertModal
        showModal={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onConfirm={handleCompletionConfirm}
        message="스티커 획득이 완료되었습니다"
      />

      <AlertModal
        showModal={showErrorModal}
        onClose={handleErrorModalClose}
        onConfirm={handleErrorModalClose}
        message={errorMessage}
        isError={true}
      />
    </div>
  );
}
