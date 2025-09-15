import { GoChevronRight } from 'react-icons/go';
import styles from './ChatSection.module.css';
import magpieImage from '../../assets/images/magpie-chat.png';

export default function ChatSection({
  title = '경북에게 질문하기',
  description = '까치에게 대화를 걸어 궁금한 점을 질문하세요.',
  buttonText = '대화하기',
  onChatClick,
  className = '',
}) {
  return (
    <div className={`${styles.chatSection} ${className}`}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      <div className={styles.chatCard}>
        <div className={styles.chatBubble}>
          <div className={styles.chatImage}>
            <img src={magpieImage} alt="까치" className={styles.magpieImage} />
          </div>
          <div className={styles.chatContent}>
            <div className={styles.chatMessage}>
              <span className={styles.chatName}>제 이름은 까치,</span>
              <div className={styles.chatDescription}>
                <span className={styles.chatBlackText}>
                  경북에 대해 궁금한 것은
                </span>
                <span className={styles.chatBlackText}>뭐든지 물어보세요!</span>
              </div>
            </div>
            <button className={styles.chatButton} onClick={onChatClick}>
              <span>{buttonText}</span>
              <GoChevronRight className={styles.arrowIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
