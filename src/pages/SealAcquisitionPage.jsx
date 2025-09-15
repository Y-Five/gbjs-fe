import { useState, useCallback, useEffect } from 'react';
import Header from '../components/header/Header';
import {
  NotificationCard,
  LocationCard,
  NearbySection,
  AcquireModal,
} from '../components/sealAcquisition';
import { AlertModal, Toast } from '../components/global';
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
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nearbyLoading, setNearbyLoading] = useState(false);

  // useGeolocation 훅 사용
  const geolocation = useGeolocation();
  const { isLoggedIn, isLoading: authLoading } = useAuth();

  const handleLocationUpdate = useCallback((newAddress) => {
    setAddress(newAddress);
  }, []);

  const handleNearbySealsUpdate = useCallback(async (newStickers) => {
    // getNearbySeals API 응답에는 이미 collected 상태와 backImageUrl이 포함되어 있음
    console.log('근처 스티커 업데이트:', newStickers);
    setStickers(newStickers);
  }, []);

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
        selectedSticker.id,
        currentLocation.lat,
        currentLocation.lng
      );

      console.log('API 응답 확인:', data);
      console.log('success 값:', data.success, typeof data.success);

      if (data.success === true) {
        // 성공 모션 표시
        setAcquireSuccess(true);

        // 5초 후 모달 닫고 완료 모달 표시
        setTimeout(async () => {
          setShowAcquireModal(false);
          setShowCompletionModal(true);
          setAcquiring(false);
          setAcquireSuccess(false);
          setSelectedSticker(null); // 선택된 스티커 초기화

          // 획득 성공 후 근처 스티커 수집 상태 새로고침
          if (geolocation.coordinates.lat && geolocation.coordinates.lng) {
            const currentLocation = {
              lat: geolocation.coordinates.lat,
              lng: geolocation.coordinates.lng,
            };

            // 근처 스티커 다시 가져오기
            try {
              const nearbyData = await getNearbySeals(
                currentLocation.lat,
                currentLocation.lng
              );
              console.log('근처 스티커 새로고침 응답:', nearbyData);
              if (
                nearbyData.code === 'SUCCESS' &&
                nearbyData.data?.nearbySeals
              ) {
                handleNearbySealsUpdate(nearbyData.data.nearbySeals);
              }
            } catch (error) {
              console.error('근처 스티커 새로고침 실패:', error);
            }
          }
        }, 5000);
      } else {
        // 실패 모션 표시 (회전 애니메이션 유지)
        setAcquireSuccess(false);

        // 5초 후 토스트 메시지 표시
        setTimeout(() => {
          setAcquiring(false);

          // 거리별 에러 메시지 설정
          const distance = selectedSticker.distance;
          const isUlleungdo =
            selectedSticker.locationName?.includes('울릉') ||
            selectedSticker.spotName?.includes('울릉');

          let errorMsg = data.message;
          if (!errorMsg) {
            if (isUlleungdo) {
              errorMsg = '울릉군은 2km 이내에서 다시 시도해주세요.';
            } else {
              errorMsg = '500m 이내에서 다시 시도해주세요.';
            }
          }

          setToastMessage(errorMsg);
          setShowToast(true);
          setSelectedSticker(null); // 선택된 스티커 초기화
        }, 5000);
      }
    } catch (error) {
      console.error('획득 API 호출 실패:', error);

      // JWT 토큰 오류 (401) 처리
      if (
        error.response?.status === 401 ||
        error.response?.data?.code === 401
      ) {
        setAcquiring(false);
        setShowAcquireModal(false);
        setShowLoginModal(true);
        setSelectedSticker(null);
        return;
      }

      // 실패 모션 표시 (회전 애니메이션 유지)
      setAcquireSuccess(false);

      // 5초 후 토스트 메시지 표시
      setTimeout(() => {
        setAcquiring(false);

        // 거리별 에러 메시지 설정
        const distance = selectedSticker.distance;
        const isUlleungdo =
          selectedSticker.locationName?.includes('울릉') ||
          selectedSticker.spotName?.includes('울릉');

        let errorMsg = '획득에 실패했습니다. ';
        if (isUlleungdo) {
          errorMsg += '울릉군은 2km 이내에서 다시 시도해주세요.';
        } else {
          errorMsg += '500m 이내에서 다시 시도해주세요.';
        }

        setToastMessage(errorMsg);
        setShowToast(true);
        setSelectedSticker(null); // 선택된 스티커 초기화
      }, 5000);
    }
  };

  const handleCompletionConfirm = () => {
    setShowCompletionModal(false);
    setSelectedSticker(null); // 선택된 스티커 초기화
    // 획득 완료 후 처리 로직
  };

  const handleToastClose = () => {
    setShowToast(false);
    setToastMessage('');
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
    // 로그인 페이지로 이동
    window.location.href = '/login';
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
          onLoadingChange={setNearbyLoading}
        />

        <NearbySection
          stickers={stickers}
          onStickerClick={handleStickerClick}
          formatDistance={formatDistance}
          loading={nearbyLoading}
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

      <Toast
        message={toastMessage}
        type="error"
        duration={4000}
        onClose={handleToastClose}
      />

      <AlertModal
        showModal={showLoginModal}
        onClose={handleLoginModalClose}
        onConfirm={handleLoginConfirm}
        message="로그인이 필요합니다. 로그인하시겠습니까?"
        confirmText="로그인하러가기"
        cancelText="취소"
      />
    </div>
  );
}
