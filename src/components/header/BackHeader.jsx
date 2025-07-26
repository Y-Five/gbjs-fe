import { useNavigate } from "react-router-dom";
import styles from "./BackHeader.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default function BackHeader({ title }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  );
}
