import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import {
  LocationCard,
  TourSection,
  ChatSection,
} from "../components/tour";
import { SearchBoxContainer as SearchBox } from "../components/global";
import styles from "./TourPage.module.css";
import { getPlacesWithinDistance } from "../data/placeDetailData";
import { useGeolocation } from "../hooks/useGeolocation";

const MAX_DISTANCE_KM = 20;
const MAX_DISPLAY_COUNT = 5;

export default function TourPage() {
  const navigate = useNavigate();
  const location = useGeolocation();

  const sortedTourData = useMemo(() => 
    getPlacesWithinDistance(MAX_DISTANCE_KM)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, MAX_DISPLAY_COUNT)
  , []);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleTourClick = (tour) => navigate(`/place/${tour.id}`);
  const handleChatClick = () => navigate('/chat');

  return (
    <div className={styles.container}>
      <Header title="관광지투어" isDark={true} />
      <div className={styles.content}>
        <SearchBox
          placeholder="경북의 어떤 관광지를 찾으세요?"
          onSearch={handleSearch}
          readOnly={true}
        />
        <LocationCard location={location} />
        <TourSection tourData={sortedTourData} onTourClick={handleTourClick} />
        <ChatSection onChatClick={handleChatClick} />
      </div>
    </div>
  );
}
