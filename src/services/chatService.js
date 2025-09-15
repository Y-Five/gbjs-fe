import {
  sendMessageToChatGPT as apiSendMessageToChatGPT,
  saveChatHistory,
} from '../apis/chatApi';

export const sendMessageToChatGPT = async (message) => {
  try {
    const data = await apiSendMessageToChatGPT(message);
    return data.response || data.message || data.content || data.reply;
  } catch (error) {
    console.error('Backend API Error:', error);

    // 에러 처리
    if (error.code === 'ECONNABORTED') {
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }

    if (error.response) {
      // 서버에서 응답은 받았지만 에러 상태
      const errorMessage =
        error.response.data?.message || `서버 오류: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      throw new Error('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
    } else {
      // 요청 설정 중 에러
      throw new Error('요청 처리 중 오류가 발생했습니다.');
    }
  }
};

// 대화 컨텍스트 관리
export const formatMessagesForAPI = (messages) => {
  return messages
    .filter((msg) => msg.type !== 'date') // 날짜 메시지 제외
    .map((msg) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));
};

// Mock API for development
export const mockChatAPI = async (message) => {
  // 개발 환경에서 사용할 Mock 응답
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const responses = {
    안녕: '안녕하세요! 경북 관광 가이드 까치입니다. 무엇을 도와드릴까요?',
    날씨: '오늘 경북 지역은 맑은 날씨가 예상됩니다. 야외 관광하기 좋은 날씨네요!',
    맛집: '경주의 황남빵, 안동의 찜닭, 포항의 물회 등 경북에는 맛있는 음식이 많아요!',
    default: '네, 경북 관광에 대해 더 자세히 알려드릴게요.',
  };

  // 간단한 키워드 매칭
  for (const [keyword, response] of Object.entries(responses)) {
    if (message.includes(keyword)) {
      return response;
    }
  }

  return responses.default;
};

// 새로운 챗봇 API 호출 함수
export const sendChatMessage = async (question) => {
  try {
    const data = await apiSendMessageToChatGPT(question);

    // API 응답 구조에 맞게 data 필드에서 실제 답변 추출
    const responseData = data.data || data;

    // 응답이 "No relevant data found."인 경우 처리
    if (responseData === 'No relevant data found.') {
      return '죄송합니다. 해당 질문에 대한 답변을 찾을 수 없습니다. 다른 질문을 해주시거나 더 구체적으로 말씀해주세요.';
    }

    return responseData;
  } catch (error) {
    console.error('Chat API Error:', error);

    if (error.response) {
      const errorMessage =
        error.response.data?.message || `서버 오류: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
    } else {
      throw new Error('요청 처리 중 오류가 발생했습니다.');
    }
  }
};
