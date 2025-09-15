import { APIService } from './axios';

// ChatGPT API 엔드포인트
const CHAT_ENDPOINT = 'http://localhost:8000/api/chat';

// ChatGPT에 메시지 전송
export const sendMessageToChatGPT = async (message, context = []) => {
  try {
    const response = await APIService.private.post(CHAT_ENDPOINT, {
      message,
      context, // 이전 대화 내용
      // 백엔드에서 ChatGPT 시스템 프롬프트 관리
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
