import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackHeader from '../components/header/BackHeader';
import { InfoCard, VoiceGuide } from '../components/placeDetail';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { getSpotById } from '../apis/spotApi';
import styles from './PlaceDetailPage.module.css';

export default function PlaceDetailPage() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTtsIndex, setSelectedTtsIndex] = useState(0);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getSpotById(contentId);

        if (response && response.contentid) {
          const apiData = response;

          // API 응답을 컴포넌트에서 사용하는 형태로 변환
          const transformedData = {
            contentId: apiData.contentid,
            name: apiData.title,
            imageUrl: apiData.firstimage,
            type: apiData.type,
            description: apiData.overview,
            address: apiData.addr1,
            phoneNumber: apiData.tel || '전화번호 없음',
            openTime: '24시간', // API에서 제공하지 않는 정보
            distance: apiData.distance,
            hasVoiceGuide:
              apiData.ttsResponseList && apiData.ttsResponseList.length > 0,
            voiceGuideText: apiData.ttsResponseList?.[0]?.script || '',
            audioUrl: apiData.ttsResponseList?.[0]?.audioURL || '',
            ttsList: apiData.ttsResponseList || [],
          };

          setPlaceData(transformedData);
        } else {
          setError('장소 정보를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('Failed to fetch place data:', err);
        setError('장소 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (contentId) {
      fetchPlaceData();
    } else {
      navigate('/search');
    }
  }, [contentId, navigate]);

  const currentTts =
    placeData?.ttsList?.[selectedTtsIndex] || placeData?.ttsList?.[0];
  const audioControls = useAudioPlayer(currentTts?.audioURL, 90);

  const handleTtsChange = useCallback((index) => {
    setSelectedTtsIndex(index);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <BackHeader title="로딩 중..." className={styles.header} />
        <div className={styles.main}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonInfoCard}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonDescription}></div>
            <div className={styles.skeletonDescription}></div>
            <div className={styles.skeletonAddress}></div>
            <div className={styles.skeletonPhone}></div>
          </div>
          <div className={styles.skeletonVoiceGuide}>
            <div className={styles.skeletonVoiceTitle}></div>
            <div className={styles.skeletonVoiceContent}></div>
            <div className={styles.skeletonVoiceContent}></div>
            <div className={styles.skeletonVoiceButton}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <BackHeader title="오류" className={styles.header} />
        <div className={styles.errorMessage}>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!placeData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <BackHeader title={placeData?.name || ''} className={styles.header} />
      <div className={styles.main}>
        {placeData?.imageUrl &&
          placeData.imageUrl.trim() !== '' &&
          placeData.imageUrl !== 'null' && (
            <div className={styles.imageSection}>
              <img
                src={placeData.imageUrl}
                alt={placeData.name || ''}
                className={styles.mainImage}
              />
            </div>
          )}
        <InfoCard placeData={placeData} />
        {placeData.hasVoiceGuide && (
          <VoiceGuide
            placeData={placeData}
            audioControls={audioControls}
            selectedTtsIndex={selectedTtsIndex}
            onTtsChange={handleTtsChange}
          />
        )}
      </div>
    </div>
  );
}
