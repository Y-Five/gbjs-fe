import sealIcon from "../../assets/images/sealCharacter.png";
import styles from "./DescriptionBanner.module.css";

export default function DescriptionBanner({ viewMode }) {
  const courseLines = [
    <>원하시는 날짜, 지역을 선택하시면</>,
    <>맞춤형 띠부씰 코스를 제공해드려요!</>,
  ];

  const regionLines = [
    <>원하시는 행정구역을 지도에서</>,
    <>
      선택하시면 <span className={styles.highlight}>띠부씰 리스트 및</span>
    </>,
    <>
      <span className={styles.highlight}>즐길거리</span>를 확인하실 수 있어요!
    </>,
  ];

  const lines = viewMode === "course" ? courseLines : regionLines;

  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        {lines.map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <img src={sealIcon} alt="seal" className={styles.icon} />
    </div>
  );
}
