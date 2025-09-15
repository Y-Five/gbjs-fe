import { useState, useMemo } from "react";
import { 
  filterSealsByCategory, 
  filterSealsByRegion, 
  filterSealsByStatus, 
  filterSealsByDifficulty 
} from "../data/allSealsData";

export const useSealFilter = (allSeals) => {
  const [filters, setFilters] = useState({
    category: "전체",
    region: "전체",
    difficulty: "전체",
    status: "전체",
    searchTerm: ""
  });

  const filteredSeals = useMemo(() => {
    if (!allSeals) return [];

    let filtered = [...allSeals];

    // 카테고리 필터
    if (filters.category !== "전체") {
      filtered = filtered.filter(seal => seal.category === filters.category);
    }

    // 지역 필터
    if (filters.region !== "전체") {
      filtered = filtered.filter(seal => seal.region === filters.region);
    }

    // 난이도 필터
    if (filters.difficulty !== "전체") {
      filtered = filtered.filter(seal => seal.difficulty === filters.difficulty);
    }

    // 수집 상태 필터
    if (filters.status !== "전체") {
      if (filters.status === "수집완료") {
        filtered = filtered.filter(seal => seal.isCollected);
      } else if (filters.status === "미수집") {
        filtered = filtered.filter(seal => !seal.isCollected);
      }
    }

    // 검색어 필터
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(seal => 
        seal.name.toLowerCase().includes(searchLower) ||
        seal.description.toLowerCase().includes(searchLower) ||
        seal.region.toLowerCase().includes(searchLower) ||
        seal.category.toLowerCase().includes(searchLower) ||
        seal.type.toLowerCase().includes(searchLower) ||
        (seal.specialFeatures && seal.specialFeatures.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ))
      );
    }

    // 정렬 (수집완료 -> 미수집, 그 다음 이름순)
    filtered.sort((a, b) => {
      if (a.isCollected !== b.isCollected) {
        return b.isCollected - a.isCollected; // 수집완료가 먼저
      }
      return a.name.localeCompare(b.name); // 이름순
    });

    return filtered;
  }, [allSeals, filters]);

  // 필터 변경
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // 검색어 변경
  const updateSearchTerm = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      category: "전체",
      region: "전체",
      difficulty: "전체", 
      status: "전체",
      searchTerm: ""
    });
  };

  // 활성 필터 개수
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== "전체") count++;
    if (filters.region !== "전체") count++;
    if (filters.difficulty !== "전체") count++;
    if (filters.status !== "전체") count++;
    if (filters.searchTerm) count++;
    return count;
  };

  return {
    filters,
    filteredSeals,
    updateFilters,
    updateSearchTerm,
    resetFilters,
    getActiveFilterCount
  };
};