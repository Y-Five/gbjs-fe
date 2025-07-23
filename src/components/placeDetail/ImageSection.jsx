import { LuChevronLeft } from "react-icons/lu";
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
        <LuChevronLeft size={20} />
      </button>
    </div>
  );
}