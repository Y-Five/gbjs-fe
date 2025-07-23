import { LuChevronLeft } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import styles from "./ChatHeader.module.css";

export default function ChatHeader({ onBack, onMenuToggle, showMenu }) {
  return (
    <header className={styles.header}>
      <button
        className={styles.backButton}
        onClick={onBack}
        aria-label="뒤로 가기"
      >
        <LuChevronLeft size={20} />
      </button>
      <h1 className={styles.title}>대화하기</h1>
      <button
        className={styles.menuButton}
        onClick={onMenuToggle}
        aria-label="메뉴"
      >
        <HiDotsVertical size={20} />
      </button>
    </header>
  );
}