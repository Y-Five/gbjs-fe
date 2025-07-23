import ArrowIcon from "../../assets/icons/ArrowIcon";
import styles from "./ImageSection.module.css";

export default function ImageSection({ placeData, onBack }) {
  return (
    <div className={styles.imageSection}>
      <img
        src={placeData?.imageUrl || ""}
        alt={placeData?.name || ""}
        className={styles.mainImage}
      />
      <button className={styles.backButton} onClick={onBack}>
        <ArrowIcon />
      </button>
    </div>
  );
}