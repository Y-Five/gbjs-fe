// 전체 데이터

export const allSeals = [
  {
    id: 1,
    name: "국제 밤하늘 보호공원",
    location: "경주 대릉원",
    region: "경주",
    collected: false,
    collectedDate: null,
    image: "/images/seals/gyeongju-daereungwon.png",
  },
  {
    id: 2,
    name: "안동 하회마을",
    location: "안동 하회마을",
    region: "안동",
    collected: false,
    collectedDate: null,
    image: "/images/seals/andong-hahoe.png",
  },
  {
    id: 3,
    name: "포항 호미곶",
    location: "포항 호미곶",
    region: "포항",
    collected: false,
    collectedDate: null,
    image: "/images/seals/pohang-homigot.png",
  },
  {
    id: 4,
    name: "울릉도 독도",
    location: "울릉도 독도전망대",
    region: "울릉",
    collected: false,
    collectedDate: null,
    image: "/images/seals/ulleung-dokdo.png",
  },
  {
    id: 5,
    name: "영주 부석사",
    location: "영주 부석사",
    region: "영주",
    collected: false,
    collectedDate: null,
    image: "/images/seals/yeongju-buseoksa.png",
  },
  {
    id: 6,
    name: "청송 주왕산",
    location: "청송 주왕산",
    region: "청송",
    collected: false,
    collectedDate: null,
    image: "/images/seals/cheongsong-juwangsan.png",
  },
  {
    id: 7,
    name: "구미 금오산",
    location: "구미 금오산",
    region: "구미",
    collected: false,
    collectedDate: null,
    image: "/images/seals/gumi-geumosan.png",
  },
  {
    id: 8,
    name: "문경 새재",
    location: "문경 새재",
    region: "문경",
    collected: false,
    collectedDate: null,
    image: "/images/seals/mungyeong-saejae.png",
  },
  {
    id: 9,
    name: "경주 첨성대",
    location: "경주 첨성대",
    region: "경주",
    collected: false,
    collectedDate: null,
    image: "/images/seals/gyeongju-cheomseongdae.png",
  },
  {
    id: 10,
    name: "안동 도산서원",
    location: "안동 도산서원",
    region: "안동",
    collected: false,
    collectedDate: null,
    image: "/images/seals/andong-dosanseowon.png",
  },
  {
    id: 11,
    name: "경주 불국사",
    location: "경주 불국사",
    region: "경주",
    collected: false,
    collectedDate: null,
    image: "/images/seals/gyeongju-bulguksa.png",
  },
  {
    id: 12,
    name: "포항 죽도시장",
    location: "포항 죽도시장",
    region: "포항",
    collected: false,
    collectedDate: null,
    image: "/images/seals/pohang-jukdo.png",
  },
  {
    id: 13,
    name: "영덕 대게거리",
    location: "영덕 대게거리",
    region: "영덕",
    collected: false,
    collectedDate: null,
    image: "/images/seals/yeongdeok-crab.png",
  },
  {
    id: 14,
    name: "울진 죽변항",
    location: "울진 죽변항",
    region: "울진",
    collected: false,
    collectedDate: null,
    image: "/images/seals/uljin-jukbyeon.png",
  },
  {
    id: 15,
    name: "봉화 청량산",
    location: "봉화 청량산",
    region: "봉화",
    collected: false,
    collectedDate: null,
    image: "/images/seals/bonghwa-cheongryangsan.png",
  },
  {
    id: 16,
    name: "예천 회룡포",
    location: "예천 회룡포",
    region: "예천",
    collected: false,
    collectedDate: null,
    image: "/images/seals/yecheon-hoeryongpo.png",
  },
  {
    id: 17,
    name: "상주 경천대",
    location: "상주 경천대",
    region: "상주",
    collected: false,
    collectedDate: null,
    image: "/images/seals/sangju-gyeongcheon.png",
  },
  {
    id: 18,
    name: "김천 직지사",
    location: "김천 직지사",
    region: "김천",
    collected: false,
    collectedDate: null,
    image: "/images/seals/gimcheon-jikjisa.png",
  },
];

// 지역별 분류
export const regions = [
  "전체",
  "경주",
  "안동",
  "포항",
  "울릉",
  "영주",
  "청송",
  "구미",
  "문경",
  "영덕",
  "울진",
  "봉화",
  "예천",
  "상주",
  "김천",
];

// 수집된 개수 계산
export const getCollectedCount = (seals) => {
  return seals.filter((seal) => seal.collected).length;
};

// 지역별 필터링
export const getSealsByRegion = (seals, region) => {
  if (region === "전체") return seals;
  return seals.filter((seal) => seal.region === region);
};

// 수집 여부별 필터링
export const getSealsByCollectionStatus = (seals, collected) => {
  return seals.filter((seal) => seal.collected === collected);
};
