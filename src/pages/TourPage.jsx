import Header from "../components/header/Header";
import {
  LocationCard,
  TourSection,
  ChatSection,
} from "../components/tour";
import { SearchBoxContainer as SearchBox } from "../components/global";
import styles from "./TourPage.module.css";
import { mockTourData } from "../data/mockTourData";
import { useGeolocation } from "../hooks/useGeolocation";

export default function TourPage() {
  const location = useGeolocation();

  const sortedTourData = [...mockTourData].sort(
    (a, b) => a.distance - b.distance
  );

  const handleSearch = (searchQuery) => {
    console.log("검색어:", searchQuery);
    // TODO: 검색 페이지로 이동
  };

  const handleTourClick = (tour) => {
    console.log("관광지 클릭:", tour);
    // TODO: 관광지 상세 페이지로 이동
  };

  const handleChatClick = () => {
    console.log("채팅 버튼 클릭");
    // TODO: 채팅 페이지로 이동
  };

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
