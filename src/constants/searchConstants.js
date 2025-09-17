// 검색 관련 상수들
export const SORT_OPTIONS = [
  { key: 'latest', label: '최신순' },
  { key: 'distance', label: '거리순' },
];

export const FILTER_OPTIONS = [
  { id: '전체', label: '전체', value: null },
  {
    id: 'MONUMENT_VIEWPOINT',
    label: '기념탑/기념비/전망대',
    value: 'MONUMENT_VIEWPOINT',
  },
  { id: 'TOURIST_COMPLEX', label: '관광단지', value: 'TOURIST_COMPLEX' },
  { id: 'HISTORIC_SITE', label: '유적지/사적지', value: 'HISTORIC_SITE' },
  { id: 'HANOK', label: '한옥', value: 'HANOK' },
  { id: 'PARK', label: '공원', value: 'PARK' },
  { id: 'FOLK_VILLAGE', label: '민속마을', value: 'FOLK_VILLAGE' },
  { id: 'CAMPING_SITE', label: '야영장/오토캠핑장', value: 'CAMPING_SITE' },
  { id: 'EXHIBITION_HALL', label: '전시관', value: 'EXHIBITION_HALL' },
  { id: 'TEMPLE', label: '사찰', value: 'TEMPLE' },
  { id: 'MUSEUM', label: '박물관', value: 'MUSEUM' },
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
export const filterFunction = (results, selectedFilter) =>
  selectedFilter === '전체'
    ? results
    : results.filter((result) => result.category === selectedFilter);
