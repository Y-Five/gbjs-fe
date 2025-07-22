export const SORT_OPTIONS = [
  { key: "accuracy", label: "정확도순" },
  { key: "popularity", label: "인기순" },
  { key: "latest", label: "최신순" },
  { key: "distance", label: "거리순" },
];

export const FILTER_OPTIONS = [
  { id: "전체", label: "전체" },
  { id: "문화유적", label: "문화유적" },
  { id: "행사", label: "행사" },
  { id: "기념품", label: "기념품" },
  { id: "이렇게 딱 맞", label: "이렇게 딱 맞" },
];

export const SEARCH_RESULTS_DATA = [
  {
    id: 1,
    name: "첨성대",
    location: "경상북도 경주시",
    description: "신라시대 천문대로 동양에서 가장 오래된 천문 관측대",
    tags: ["유명 관광지", "야경", "역사"],
    category: "문화유적",
    popularity: 95,
    distance: 2.1,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "불국사",
    location: "경상북도 경주시",
    description: "신라 불교 예술의 걸작으로 유네스코 세계문화유산",
    tags: ["문화유적", "불교", "세계유산"],
    category: "문화유적",
    popularity: 98,
    distance: 3.5,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "석굴암",
    location: "경상북도 경주시",
    description: "동양 조각 예술의 최고 걸작품으로 평가받는 석굴 사원",
    tags: ["문화유적", "불교", "조각"],
    category: "문화유적",
    popularity: 92,
    distance: 4.2,
    createdAt: "2024-01-12",
  },
  {
    id: 4,
    name: "안압지",
    location: "경상북도 경주시",
    description: "신라 왕궁의 별궁에 있던 인공 연못으로 야경이 아름다움",
    tags: ["연못", "야경", "역사"],
    category: "문화유적",
    popularity: 88,
    distance: 1.8,
    createdAt: "2024-01-20",
  },
  {
    id: 5,
    name: "롯데월드타워",
    location: "서울특별시 송파구",
    description: "국내 최고층 빌딩으로 서울의 랜드마크",
    tags: ["전망대", "쇼핑", "랜드마크"],
    category: "기타",
    popularity: 85,
    distance: 350.2,
    createdAt: "2024-01-25",
  },
  {
    id: 6,
    name: "건대입구 맛의거리",
    location: "서울특별시 광진구",
    description: "다양한 맛집이 모여있는 젊음의 거리",
    tags: ["맛집", "먹거리", "대학가"],
    category: "기타",
    popularity: 78,
    distance: 340.8,
    createdAt: "2024-01-18",
  },
  {
    id: 7,
    name: "경주월드",
    location: "경상북도 경주시",
    description: "경주의 대표적인 테마파크로 가족 단위 관광객에게 인기",
    tags: ["테마파크", "가족여행", "놀이기구"],
    category: "행사",
    popularity: 82,
    distance: 5.7,
    createdAt: "2024-01-22",
  },
  {
    id: 8,
    name: "경주 황리단길",
    location: "경상북도 경주시",
    description: "경주의 젊은 감성이 담긴 핫플레이스 거리",
    tags: ["카페", "맛집", "쇼핑"],
    category: "기타",
    popularity: 75,
    distance: 2.8,
    createdAt: "2024-01-30",
  },
  {
    id: 9,
    name: "경주 전통공예품 체험관",
    location: "경상북도 경주시",
    description: "전통 공예품 제작 체험과 구매가 가능한 문화체험 공간",
    tags: ["체험", "전통공예", "기념품"],
    category: "기념품",
    popularity: 68,
    distance: 3.1,
    createdAt: "2024-01-08",
  },
  {
    id: 10,
    name: "신라문화제",
    location: "경상북도 경주시",
    description: "매년 열리는 경주의 대표적인 문화축제",
    tags: ["축제", "문화행사", "전통"],
    category: "행사",
    popularity: 90,
    distance: 2.5,
    createdAt: "2024-02-01",
  },
];

// 정렬 함수들
export const sortFunctions = {
  accuracy: (results) =>
    [...results].sort((a, b) => a.name.localeCompare(b.name)),
  popularity: (results) =>
    [...results].sort((a, b) => b.popularity - a.popularity),
  latest: (results) =>
    [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  distance: (results) => [...results].sort((a, b) => a.distance - b.distance),
};

// 필터 함수
export const filterFunction = (results, selectedFilter) => {
  if (selectedFilter === "전체") return results;
  return results.filter((result) => result.category === selectedFilter);
};
