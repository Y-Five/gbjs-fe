import { useState } from "react";
import Header from "../components/header/Header";
import SearchBar from "../components/sealTour/SearchBar";
import ViewToggleTabs from "../components/sealTour/ViewToggleTabs";
import DescriptionBanner from "../components/sealTour/DescriptionBanner";
import DateSelector from "../components/sealTour/DateSelector";
import RegionSelector from "../components/sealTour/RegionSelector";
import ConfirmButton from "../components/sealTour/ConfirmButton";
import PopularSpotList from "../components/sealTour/PopularSpotList";

import styles from "./SealTourPage.module.css";

export default function SealTourPage() {
  const [viewMode, setViewMode] = useState("course"); // "course" | "region"

  return (
    <div className={styles.page}>
      <Header title="띠부씰 지도" isDark={true} />
      <main className={styles.main}>
        <SearchBar />
        <ViewToggleTabs viewMode={viewMode} onChange={setViewMode} />
        <DescriptionBanner viewMode={viewMode} />
        {viewMode === "course" && <DateSelector />}
        <RegionSelector viewMode={viewMode} />
        <ConfirmButton viewMode={viewMode} />
        <PopularSpotList />
      </main>
    </div>
  );
}
