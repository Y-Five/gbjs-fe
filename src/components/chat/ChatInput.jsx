import { GoArrowUp } from "react-icons/go";
import { CHAT_CONSTANTS } from "../../constants/chatConstants";
import styles from "./ChatInput.module.css";

export default function ChatInput({ 
  inputText, 
  onInputChange, 
  onKeyPress, 
  onSend 
}) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={CHAT_CONSTANTS.PLACEHOLDER_TEXT}
          className={styles.input}
        />
        <button
          onClick={onSend}
          disabled={!inputText.trim()}
          className={styles.sendButton}
          aria-label="메시지 보내기"
        >
          <GoArrowUp size={16} style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
}