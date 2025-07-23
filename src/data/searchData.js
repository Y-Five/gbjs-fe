import { placeDetailData } from "./placeDetailData";

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

export const SEARCH_RESULTS_DATA = placeDetailData.map((place) => ({
  id: place.id,
  name: place.name,
  location: place.location,
  description: place.detailedDescription || place.description,
  tags: place.tags,
  category: place.category,
  popularity: place.popularity,
  distance: place.distance,
  createdAt: place.createdAt,
  imageUrl: place.imageUrl,
}));

export const sortFunctions = {
  accuracy: (results) =>
    [...results].sort((a, b) => a.name.localeCompare(b.name)),
  popularity: (results) =>
    [...results].sort((a, b) => b.popularity - a.popularity),
  latest: (results) =>
    [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  distance: (results) => [...results].sort((a, b) => a.distance - b.distance),
};

export const filterFunction = (results, selectedFilter) =>
  selectedFilter === "전체"
    ? results
    : results.filter((result) => result.category === selectedFilter);
