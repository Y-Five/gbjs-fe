export const CHAT_CONSTANTS = {
  BOT_NAME: "까치",
  BOT_RESPONSES: [
    "비 오는 날에는 실내 관광지를 추천드려요! 경주 국립박물관이나 안동 하회세계탈박물관은 어떠신가요?",
    "비가 와도 즐길 수 있는 곳들이 많아요. 포항 죽도시장에서 맛있는 음식을 즐기시는 것도 좋을 것 같아요.",
    "실내에서 즐길 수 있는 체험 프로그램들도 많이 있어요. 영주 선비촌에서 전통문화 체험은 어떠신가요?",
    "날씨가 좋지 않을 때는 카페 투어도 좋아요. 경주의 한옥 카페들을 둘러보시는 것도 추천드려요."
  ],
  TYPING_DELAY: 1500,
  INITIAL_MESSAGE: "안녕하세요! 제 이름은 '까치' 라고 해요. 경북 관광지에 대해 어떤것이 궁금하신가요?",
  PLACEHOLDER_TEXT: "내용을 입력하세요",
  MENU_ITEMS: {
    TEXT: { label: "텍스트 질문하기", action: "text" },
    VOICE: { label: "음성 질문하기", action: "voice" },
    END: { label: "대화 종료하기", action: "endChat" }
  }
};

export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];