import { useState, useCallback } from "react";
import { CHAT_CONSTANTS } from "../constants/chatConstants";
import { sendMessageToChatGPT, formatMessagesForAPI, mockChatAPI } from "../services/chatService";

export const useChat = (initialMessages) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputText,
      time: new Date(),
    };

    addMessage(userMessage);
    setInputText("");
    setIsTyping(true);
    setError(null);

    try {
      // 백엔드 API 사용 (일단 Mock API로 설정)
      const USE_REAL_API = false;
      
      let response;
      if (USE_REAL_API) {
        const context = formatMessagesForAPI(messages);
        response = await sendMessageToChatGPT(inputText, context);
      } else {
        response = await mockChatAPI(inputText);
      }

      const botMessage = {
        id: Date.now(),
        type: "bot",
        text: response,
        time: new Date(),
        name: CHAT_CONSTANTS.BOT_NAME,
      };
      
      addMessage(botMessage);
    } catch (err) {
      setError(err.message || "메시지 전송에 실패했습니다.");
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now(),
        type: "bot",
        text: "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        time: new Date(),
        name: CHAT_CONSTANTS.BOT_NAME,
        isError: true,
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, messages, addMessage]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const deleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    error,
    sendMessage,
    handleKeyPress,
    addMessage,
    clearMessages,
    deleteMessage,
  };
};