import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChatMessage, 
  ChatInput, 
  TypingIndicator 
} from "../components/chat";
import BackHeader from "../components/header/BackHeader";
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



  return (
    <div className={styles.container}>
      <BackHeader title="대화하기" className={styles.chatHeader} />

      <div className={styles.messagesContainer}>
        <div className={styles.spacer} />
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

      {error && (
        <div className={styles.errorToast}>
          {error}
        </div>
      )}
    </div>
  );
}