import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import { InfoCard, VoiceGuide } from "../components/placeDetail";
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
      navigate("/tour");
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

  return (
    <div className={styles.container}>
      <BackHeader title={placeData?.name || ""} className={styles.header} />
      <div className={styles.imageSection}>
        <img
          src={placeData?.imageUrl || ""}
          alt={placeData?.name || ""}
          className={styles.mainImage}
        />
      </div>
      <InfoCard placeData={placeData} />
      {placeData.hasVoiceGuide && (
        <VoiceGuide placeData={placeData} audioControls={audioControls} />
      )}
    </div>
  );
}
