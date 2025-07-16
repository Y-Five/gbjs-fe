import { useState } from "react";
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
import styles from "./GyeongbukMap.module.css";

export default function GyeongbukMap({ onSelect }) {
  const [selected, setSelected] = useState("");

  const handleSelect = (name) => {
    setSelected(name);
    onSelect(name);
  };

  return (
    <div className={styles.mapContainer}>
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <g onClick={() => handleSelect("안동시")}>
          <Andong
            fill={selected === "안동시" ? "#4C8BF5" : "#A8A8A8"}
            selected={selected === "안동시"}
          />
        </g>
        <g onClick={() => handleSelect("봉화군")}>
          <Bonghwa
            fill={selected === "봉화군" ? "#4C8BF5" : "#A8A8A8"}
            selected={selected === "봉화군"}
          />
        </g>
        <g onClick={() => handleSelect("청도군")}>
          <Cheongdo fill={selected === "청도군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "청도군"}/>
        </g>
        <g onClick={() => handleSelect("청송군")}>
          <Cheongsong fill={selected === "청송군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "청송군"}/>
        </g>
        <g onClick={() => handleSelect("칠곡군")}>
          <Chilgok fill={selected === "칠곡군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "칠곡군"}/>
        </g>
        <g onClick={() => handleSelect("김천시")}>
          <Gimcheon fill={selected === "김천시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "김천시"}/>
        </g>
        <g onClick={() => handleSelect("고령군")}>
          <Goryeong fill={selected === "고령군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "고령군"}/>
        </g>
        <g onClick={() => handleSelect("구미시")}>
          <Gumi fill={selected === "구미시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "구미시"}/>
        </g>
        <g onClick={() => handleSelect("군위군")}>
          <Gunwi fill={selected === "군위군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "군위군"}/>
        </g>
        <g onClick={() => handleSelect("경주시")}>
          <Gyeongju fill={selected === "경주시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "경주시"}/>
        </g>
        <g onClick={() => handleSelect("경산시")}>
          <Gyeongsan fill={selected === "경산시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "경산시"}/>
        </g>
        <g onClick={() => handleSelect("문경시")}>
          <Mungyeong fill={selected === "문경시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "문경시"}/>
        </g>
        <g onClick={() => handleSelect("포항시")}>
          <Pohang fill={selected === "포항시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "포항시"}/>
        </g>
        <g onClick={() => handleSelect("상주시")}>
          <Sangju fill={selected === "상주시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "상주시"}/>
        </g>
        <g onClick={() => handleSelect("성주군")}>
          <Seongju fill={selected === "성주군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "성주군"}/>
        </g>
        <g onClick={() => handleSelect("의성군")}>
          <Uiseong fill={selected === "의성군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "의성군"}/>
        </g>
        <g onClick={() => handleSelect("울진군")}>
          <Uljin fill={selected === "울진군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "울진군"}/>
        </g>
        <g onClick={() => handleSelect("울릉군")}>
          <Ulleung fill={selected === "울릉군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "울릉군"}/>
          <Dokdo fill={selected === "울릉군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "울릉군"}/>
        </g>
        <g onClick={() => handleSelect("예천군")}>
          <Yechon fill={selected === "예천군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "예천군"}/>
        </g>
        <g onClick={() => handleSelect("영덕군")}>
          <Yeongdeok fill={selected === "영덕군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "영덕군"}/>
        </g>
        <g onClick={() => handleSelect("영주시")}>
          <Yeongju fill={selected === "영주시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "영주시"}/>
        </g>
        <g onClick={() => handleSelect("영양군")}>
          <Yeongyang fill={selected === "영양군" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "영양군"}/>
        </g>
        <g onClick={() => handleSelect("영천시")}>
          <Yeongcheon fill={selected === "영천시" ? "#4C8BF5" : "#A8A8A8"} 
          selected={selected === "영천시"}/>
        </g>
      </svg>
    </div>
  );
}
