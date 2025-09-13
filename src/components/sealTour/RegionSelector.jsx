import { useRef } from "react";
import styles from "./RegionSelector.module.css";
import GyeongbukMap from "../regionMap/GyeongbukMap";

export default function RegionSelector({
  viewMode = "course",
  multiSelect = true,
  onRegionSelect,
  showTitle = true,
  customTitle,
  selectedLocations = [],
  onLocationChange,
}) {
  const selectAllTrigger = useRef(null);

  const titleText =
    customTitle ?? (viewMode === "course" ? "2. 지역 선택" : "행정구역 선택");

  const handleRegionSelect = (regionNames) => {
    // GyeongbukMap에서 전체 선택된 지역 배열을 전달받음
    if (Array.isArray(regionNames)) {
      if (onLocationChange) {
        onLocationChange(regionNames);
      }
    } else {
      // 단일 지역명인 경우 (기존 로직 유지)
      if (onLocationChange) {
        if (selectedLocations.includes(regionNames)) {
          onLocationChange(
            selectedLocations.filter((loc) => loc !== regionNames)
          );
        } else {
          onLocationChange([...selectedLocations, regionNames]);
        }
      }
    }

    if (onRegionSelect) {
      onRegionSelect(regionNames);
    }
  };

  return (
    <div className={styles.section}>
      {showTitle && <h3 className={styles.title}>{titleText}</h3>}
      <div className={styles.mapWrapper}>
        <GyeongbukMap
          multiSelect={multiSelect}
          onSelect={handleRegionSelect}
          selectAllTrigger={selectAllTrigger}
          defaultSelected={selectedLocations}
        />
        {multiSelect && (
          <button
            className={styles.selectAll}
            onClick={() => selectAllTrigger.current?.()}
          >
            전체
          </button>
        )}
      </div>
    </div>
  );
}
