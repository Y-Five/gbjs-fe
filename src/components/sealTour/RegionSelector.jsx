import { useRef } from "react";
import styles from "./RegionSelector.module.css";
import GyeongbukMap from "../regionMap/GyeongbukMap";

export default function RegionSelector({
  viewMode = "course",
  multiSelect = true,
  onRegionSelect,
  showTitle = true,
  customTitle,
}) {
  const selectAllTrigger = useRef(null);

  const titleText = customTitle ?? (viewMode === "course" ? "2. 지역 선택" : "행정구역 선택");

  return (
    <div className={styles.section}>
      {showTitle && <h3 className={styles.title}>{titleText}</h3>}
      <div className={styles.mapWrapper}>
        <GyeongbukMap
          multiSelect={multiSelect}
          onSelect={onRegionSelect}
          selectAllTrigger={selectAllTrigger}
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
