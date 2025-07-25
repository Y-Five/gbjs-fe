import BackHeader from "../components/header/BackHeader";
import RegionSelector from "../components/sealTour/RegionSelector";
import styles from "./AdministrativePage.module.css";
import StickerList from "../components/courseDetail/StickerList";

export default function AdministrativePage() {
  const handleRegionSelect = (selected) => {
    console.log("선택된 지역:", selected);
  };

  const stickers = [
    { title: "월영교", collected: true },
    { title: "안동 문화의 거리", collected: false },
  ];

  return (
    <>
      <BackHeader title="행정구역 띠부실" />
      <div className={styles.main}>
        <RegionSelector
          viewMode="admin"
          onRegionSelect={handleRegionSelect}
          showTitle={false}
        />
        <StickerList stickers={stickers} />
      </div>
    </>
  );
}
