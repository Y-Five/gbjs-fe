import { useState } from "react";
import styles from "./GyeongbukMap.module.css";

const REGION_NAMES = [
  "안동시", "봉화군", "청도군", "청송군", "칠곡군", "김천시", "고령군", "구미시",
  "군위군", "경주시", "경산시", "문경시", "포항시", "상주시", "성주군", "의성군",
  "울진군", "울릉군", "예천군", "영덕군", "영주시", "영양군", "영천시"
];

// SVG 컴포넌트
import Andong from "./svg/Andong";
import Bonghwa from "./svg/Bonghwa";
import Cheongdo from "./svg/Cheongdo";
import Cheongsong from "./svg/Cheongsong";
import Chilgok from "./svg/Chilgok";
import Gimcheon from "./svg/Gimcheon";
import Goryeong from "./svg/Goryeong";
import Gumi from "./svg/Gumi";
import Gunwi from "./svg/Gunwi";
import Gyeongju from "./svg/Gyeongju";
import Gyeongsan from "./svg/Gyeongsan";
import Mungyeong from "./svg/Mungyeong";
import Pohang from "./svg/Pohang";
import Sangju from "./svg/Sangju";
import Seongju from "./svg/Seongju";
import Uiseong from "./svg/Uiseong";
import Uljin from "./svg/Uljin";
import Ulleung from "./svg/Ulleung";
import Yechon from "./svg/Yechon";
import Yeongdeok from "./svg/Yeongdeok";
import Yeongju from "./svg/Yeongju";
import Yeongyang from "./svg/Yeongyang";
import Yeongcheon from "./svg/Yeongcheon";
import Dokdo from "./svg/Dokdo";

export default function GyeongbukMap({ onSelect, multiSelect = false, selectAllTrigger }) {
  const [selected, setSelected] = useState([]);

  const isSelected = (name) => selected.includes(name);

  const handleSelect = (name) => {
    let newSelected;
    if (multiSelect) {
      newSelected = isSelected(name)
        ? selected.filter((item) => item !== name)
        : [...selected, name];
    } else {
      newSelected = [name];
    }

    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  const handleToggleSelectAll = () => {
    const isAllSelected = REGION_NAMES.every((name) => selected.includes(name));
    const newSelected = isAllSelected ? [] : [...REGION_NAMES];
    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  if (selectAllTrigger) {
    selectAllTrigger.current = handleToggleSelectAll;
  }

  return (
    <div className={styles.mapContainer}>
      <svg viewBox="0 0 300 270" xmlns="http://www.w3.org/2000/svg">
        <g onClick={() => handleSelect("안동시")}>
          <Andong fill={isSelected("안동시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("봉화군")}>
          <Bonghwa fill={isSelected("봉화군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("청도군")}>
          <Cheongdo fill={isSelected("청도군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("청송군")}>
          <Cheongsong fill={isSelected("청송군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("칠곡군")}>
          <Chilgok fill={isSelected("칠곡군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("김천시")}>
          <Gimcheon fill={isSelected("김천시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("고령군")}>
          <Goryeong fill={isSelected("고령군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("구미시")}>
          <Gumi fill={isSelected("구미시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("군위군")}>
          <Gunwi fill={isSelected("군위군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("경주시")}>
          <Gyeongju fill={isSelected("경주시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("경산시")}>
          <Gyeongsan fill={isSelected("경산시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("문경시")}>
          <Mungyeong fill={isSelected("문경시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("포항시")}>
          <Pohang fill={isSelected("포항시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("상주시")}>
          <Sangju fill={isSelected("상주시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("성주군")}>
          <Seongju fill={isSelected("성주군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("의성군")}>
          <Uiseong fill={isSelected("의성군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("울진군")}>
          <Uljin fill={isSelected("울진군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("울릉군")}>
          <Ulleung fill={isSelected("울릉군") ? "#4C8BF5" : "#A8A8A8"} />
          <Dokdo fill={isSelected("울릉군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("예천군")}>
          <Yechon fill={isSelected("예천군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("영덕군")}>
          <Yeongdeok fill={isSelected("영덕군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("영주시")}>
          <Yeongju fill={isSelected("영주시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("영양군")}>
          <Yeongyang fill={isSelected("영양군") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
        <g onClick={() => handleSelect("영천시")}>
          <Yeongcheon fill={isSelected("영천시") ? "#4C8BF5" : "#A8A8A8"} />
        </g>
      </svg>
    </div>
  );
}
