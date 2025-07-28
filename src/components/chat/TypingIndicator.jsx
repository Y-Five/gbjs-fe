import magpieAvatar from "../../assets/images/magpie.png";
import { CHAT_CONSTANTS } from "../../constants/chatConstants";
import styles from "./TypingIndicator.module.css";

export default function TypingIndicator() {
  return (
    <div className={`${styles.messageWrapper} ${styles.bot}`}>
      <div className={styles.profileContainer}>
        <div className={styles.avatar}>
          <img
            src={magpieAvatar}
            alt="까치"
            className={styles.avatarImage}
          />
        </div>
        <span className={styles.botName}>{CHAT_CONSTANTS.BOT_NAME}</span>
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.messageRow}>
          <div className={styles.messageBubble}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}