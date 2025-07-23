import { CHAT_CONSTANTS } from "../../constants/chatConstants";
import styles from "./ChatMenu.module.css";

export default function ChatMenu({ onMenuClick }) {
  const { TEXT, VOICE, END } = CHAT_CONSTANTS.MENU_ITEMS;

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.menuContainer}>
        <button
          className={styles.menuItem}
          onClick={() => onMenuClick(TEXT.action)}
        >
          {TEXT.label}
        </button>
        <button
          className={styles.menuItem}
          onClick={() => onMenuClick(VOICE.action)}
        >
          {VOICE.label}
        </button>
        <button
          className={`${styles.menuItem} ${styles.endChat}`}
          onClick={() => onMenuClick(END.action)}
        >
          {END.label}
        </button>
      </div>
    </div>
  );
}