import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChatHeader, 
  ChatMessage, 
  ChatInput, 
  ChatMenu, 
  TypingIndicator 
} from "../components/chat";
import { useChat } from "../hooks/useChat";
import { getTodayDateString } from "../utils/dateUtils";
import { CHAT_CONSTANTS } from "../constants/chatConstants";
import styles from "./ChatPage.module.css";

const getInitialMessages = () => [
  {
    id: "date-1",
    type: "date",
    text: getTodayDateString(),
    time: new Date(),
  },
  {
    id: 1,
    type: "bot",
    text: CHAT_CONSTANTS.INITIAL_MESSAGE,
    time: new Date(),
    name: CHAT_CONSTANTS.BOT_NAME,
  },
];

export default function ChatPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [showMenu, setShowMenu] = useState(true);

  const {
    messages,
    inputText,
    setInputText,
    isTyping,
    error,
    sendMessage,
    handleKeyPress,
  } = useChat(getInitialMessages());

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleMenuClick = useCallback((action) => {
    if (action === "text") {
      setShowMenu(false);
    } else if (action === "voice") {
      alert("음성 질문 기능은 준비 중입니다.");
    } else if (action === "endChat") {
      navigate(-1);
    }
  }, [navigate]);

  const handleMenuToggle = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <ChatHeader 
        onBack={handleBack}
        onMenuToggle={handleMenuToggle}
        showMenu={showMenu}
      />

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        inputText={inputText}
        onInputChange={setInputText}
        onKeyPress={handleKeyPress}
        onSend={sendMessage}
      />

      {showMenu && <ChatMenu onMenuClick={handleMenuClick} />}
      
      {error && (
        <div className={styles.errorToast}>
          {error}
        </div>
      )}
    </div>
  );
}