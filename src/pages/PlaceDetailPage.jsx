import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageSection, InfoCard, VoiceGuide } from "../components/placeDetail";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { getPlaceById } from "../data/placeDetailData";
import styles from "./PlaceDetailPage.module.css";

export default function PlaceDetailPage() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundPlace = getPlaceById(contentId);
    setPlaceData(foundPlace);
    setIsLoading(false);
    
    if (!foundPlace) {
      navigate('/tour');
    }
  }, [contentId, navigate]);

  const audioControls = useAudioPlayer(placeData?.audioUrl, 90);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>로딩 중...</div>
      </div>
    );
  }

  if (!placeData) {
    return null;
  }

  const handleBack = () => navigate(-1);

  return (
    <div className={styles.container}>
      <ImageSection placeData={placeData} onBack={handleBack} />
      <InfoCard placeData={placeData} />
      {placeData.hasVoiceGuide && (
        <VoiceGuide placeData={placeData} audioControls={audioControls} />
      )}
    </div>
  );
}
