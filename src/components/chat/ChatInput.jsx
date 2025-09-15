import { GoArrowUp } from 'react-icons/go';
import { CHAT_CONSTANTS } from '../../constants/chatConstants';
import styles from './ChatInput.module.css';

export default function ChatInput({
  inputText,
  onInputChange,
  onKeyPress,
  onSend,
  isLoading = false,
}) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={
            isLoading
              ? '응답을 기다리는 중...'
              : CHAT_CONSTANTS.PLACEHOLDER_TEXT
          }
          className={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          disabled={!inputText.trim() || isLoading}
          className={`${styles.sendButton} ${isLoading ? styles.loading : ''}`}
          aria-label="메시지 보내기"
        >
          <GoArrowUp size={16} style={{ color: '#fff' }} />
        </button>
      </div>
    </div>
  );
}
