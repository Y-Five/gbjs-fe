// SealShop Mock Data - 띠부씰 상점 상품 데이터

export const sealProducts = [
  {
    id: 1,
    name: "경주 대릉원",
    price: 3000,
    image: "/images/seal-gyeongju.png",
    category: "지역특산",
    region: "경주",
    description: "경주 대릉원을 테마로 한 특별 띠부씰",
    stock: 15,
    isPopular: true,
  },
  {
    id: 2,
    name: "안동 하회마을",
    price: 3500,
    image: "/images/seal-andong.png",
    category: "전통문화",
    region: "안동",
    description: "안동 하회마을의 전통 탈춤을 모티브로 한 띠부씰",
    stock: 12,
    isPopular: true,
  },
  {
    id: 3,
    name: "포항 호미곶",
    price: 2800,
    image: "/images/seal-pohang.png",
    category: "바다",
    region: "포항",
    description: "한반도 최동단 호미곶의 일출을 담은 띠부씰",
    stock: 20,
    isPopular: false,
  },
  {
    id: 4,
    name: "울릉도 독도",
    price: 4000,
    image: "/images/seal-ulleung.png",
    category: "섬",
    region: "울릉",
    description: "우리땅 독도와 울릉도를 표현한 특별 띠부씰",
    stock: 8,
    isPopular: true,
  },
  {
    id: 5,
    name: "영주 부석사",
    price: 3200,
    image: "/images/seal-yeongju.png",
    category: "문화재",
    region: "영주",
    description: "유네스코 세계문화유산 부석사를 담은 띠부씰",
    stock: 10,
    isPopular: false,
  },
  {
    id: 6,
    name: "청송 주왕산",
    price: 2900,
    image: "/images/seal-cheongsong.png",
    category: "자연",
    region: "청송",
    description: "주왕산 국립공원의 아름다운 경관을 표현한 띠부씰",
    stock: 18,
    isPopular: false,
  },
  {
    id: 7,
    name: "구미 금오산",
    price: 2700,
    image: "/images/seal-gumi.png",
    category: "자연",
    region: "구미",
    description: "금오산의 가을 단풍을 모티브로 한 띠부씰",
    stock: 22,
    isPopular: false,
  },
  {
    id: 8,
    name: "문경 새재",
    price: 3100,
    image: "/images/seal-mungyeong.png",
    category: "역사",
    region: "문경",
    description: "문경새재 옛길의 역사와 정취를 담은 띠부씰",
    stock: 14,
    isPopular: true,
  },
];

export const categories = [
  "전체",
  "지역특산",
  "전통문화",
  "바다",
  "섬",
  "문화재",
  "자연",
  "역사",
];

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
];

// 인기 상품 필터링
export const getPopularProducts = () => {
  return sealProducts.filter((product) => product.isPopular);
};

// 카테고리별 상품 필터링
export const getProductsByCategory = (category) => {
  if (category === "전체") return sealProducts;
  return sealProducts.filter((product) => product.category === category);
};

// 지역별 상품 필터링
export const getProductsByRegion = (region) => {
  if (region === "전체") return sealProducts;
  return sealProducts.filter((product) => product.region === region);
};
