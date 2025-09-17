import { useState, useMemo } from "react";

export const useProductFilter = (products) => {
  const [filters, setFilters] = useState({
    category: "전체",
    region: "전체",
    sortBy: "name",
    searchTerm: ""
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products
      .filter(product => {
        // 카테고리 필터
        const categoryMatch = filters.category === "전체" || product.category === filters.category;
        
        // 지역 필터
        const regionMatch = filters.region === "전체" || product.region === filters.region;
        
        // 검색어 필터
        const searchMatch = !filters.searchTerm || 
          product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

        return categoryMatch && regionMatch && searchMatch;
      })
      .sort((a, b) => {
        switch(filters.sortBy) {
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "popular":
            return b.isPopular - a.isPopular;
          case "stock":
            return b.stock - a.stock;
          case "name":
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [products, filters]);

  return {
    filteredProducts,
    filters,
    setFilters
  };
};