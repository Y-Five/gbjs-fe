import { APIService } from './axios';

// ChatGPT API 엔드포인트
const CHAT_ENDPOINT = '/api/chat';

// ChatGPT에 메시지 전송
export const sendMessageToChatGPT = async (question) => {
  try {
    const response = await APIService.private.post(CHAT_ENDPOINT, {
      question,
    });

    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('ChatGPT API Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      },
    });
    throw error;
  }
};

// 채팅 기록 저장
export const saveChatHistory = async (chatData) => {
  try {
    const response = await APIService.private.post('/api/chat', {
      messages: chatData.messages,
      timestamp: chatData.timestamp,
      userId: chatData.userId,
    });

    const payload = response?.data ?? response;
    return payload;
  } catch (error) {
    console.error('Save chat history API Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      },
    });
    throw error;
  }
};
