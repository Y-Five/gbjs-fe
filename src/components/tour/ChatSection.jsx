import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./ChatSection.module.css";

export default function ChatSection({ 
  title = "경북에게 질문하기",
  description = "경북의 숨은 명소와 맛집에 대해 물어보세요",
  userName = "ㅇㅇ",
  buttonText = "질문하기",
  onChatClick,
  className = ""
}) {
  return (
    <div className={`${styles.chatSection} ${className}`}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      <div className={styles.chatCard}>
        <div className={styles.chatBubble}>
          <div className={styles.chatMessage}>
            <span className={styles.chatName}>제 이름은 {userName},</span>
            <div className={styles.chatDescription}>
              <span className={styles.chatBlackText}>경북에 대해 궁금한 것은</span>
              <span className={styles.chatBlackText}>뭐든지 물어보세요!</span>
            </div>
          </div>
          <button className={styles.chatButton} onClick={onChatClick}>
            <span>{buttonText}</span>
            <BiRightArrowAlt className={styles.arrowIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}