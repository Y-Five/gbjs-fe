import magpieAvatar from "../../assets/images/magpie.png";
import { formatTime } from "../../utils/dateUtils";
import styles from "./ChatMessage.module.css";

export default function ChatMessage({ message }) {
  if (message.type === "date") {
    return (
      <div className={styles.dateWrapper}>
        <div className={styles.dateBadge}>
          <span>{message.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.messageWrapper} ${styles[message.type]}`}
    >
      {message.type === "bot" && (
        <div className={styles.botInfo}>
          <div className={styles.avatar}>
            <img
              src={magpieAvatar}
              alt="까치"
              className={styles.avatarImage}
            />
          </div>
          <span className={styles.botName}>{message.name}</span>
        </div>
      )}
      <div className={styles.messageContent}>
        <div className={styles.messageBubble}>
          <p className={styles.messageText}>{message.text}</p>
        </div>
        <span className={styles.messageTime}>
          {formatTime(message.time)}
        </span>
      </div>
    </div>
  );
}