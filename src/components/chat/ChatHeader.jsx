import { LuChevronLeft } from "react-icons/lu";
import styles from "./ChatHeader.module.css";

export default function ChatHeader({ onBack, title }) {
  return (
    <header className={styles.header}>
      <button
        className={styles.backButton}
        onClick={onBack}
        aria-label="뒤로 가기"
      >
        <LuChevronLeft size={20} />
      </button>
      <h1 className={styles.title}>{title || "대화하기"}</h1>
      <div className={styles.spacer} />
    </header>
  );
}