import { useNavigate } from "react-router-dom";
import styles from "./BackHeader.module.css";

export default function BackHeader({ title }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  );
}
