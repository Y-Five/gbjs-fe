import { useState, useMemo, useCallback, memo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { SearchBoxContainer as SearchBox } from '../components/global';
import {
  SearchFilters,
  SearchResults,
  SearchHeader,
  SearchSortSection,
} from '../components/search';
import { useSearchData } from '../hooks/useSearchData';
import { FILTER_OPTIONS } from '../constants/searchConstants';
import styles from './SearchPage.module.css';

const SearchPage = memo(function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isInitialized = useRef(false);

  const previousPage = useRef(location.state?.from || '/');

  const getSortByFromParams = (order) => {
    switch (order) {
      case 'ABC':
        return { key: 'ABC', label: '가나다순' };
      case 'DISTANCE':
      default:
        return { key: 'DISTANCE', label: '거리순' };
    }
  };

  const [sortBy, setSortBy] = useState(
    getSortByFromParams(searchParams.get('order'))
  );

  const {
    searchResults,
    loading,
    hasMore,
    totalElements,
    lastElementRef,
    executeSearch,
  } = useSearchData(searchQuery, sortBy, selectedCategory);

  useEffect(() => {
    if (!isInitialized.current) {
      const urlQuery = searchParams.get('q');
      const urlOrder = searchParams.get('order');

      if (urlQuery?.trim()) {
        setSearchQuery(urlQuery);

        if (urlOrder) {
          setSortBy(getSortByFromParams(urlOrder));
        }

        setTimeout(() => {
          executeSearch();
        }, 0);
      }

      isInitialized.current = true;
    }
  }, []);

  const filteredAndSorted = useMemo(() => {
    return searchResults || [];
  }, [searchResults]);

  const handleSearch = useCallback(() => {
    executeSearch();
    navigate(
      `/search?q=${encodeURIComponent(searchQuery)}&order=${sortBy.key}`,
      { replace: true }
    );
  }, [navigate, searchQuery, sortBy.key, executeSearch]);

  const handleBackClick = useCallback(() => {
    navigate(previousPage.current);
  }, [navigate]);

  const handleResultClick = useCallback(
    (result) => navigate(`/place/${result.contentId}`),
    [navigate]
  );

  const handleSearchQueryChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleFilterChange = useCallback(
    (filter) => {
      setSelectedFilter(filter);
      // FILTER_OPTIONS에서 해당 filter의 value를 찾아서 selectedCategory 설정
      const filterOption = FILTER_OPTIONS.find(
        (option) => option.id === filter
      );
      setSelectedCategory(filterOption ? filterOption.value : null);

      // 카테고리가 변경되면 검색 실행
      if (searchQuery?.trim()) {
        setTimeout(() => {
          executeSearch();
        }, 0);
      }
    },
    [searchQuery, executeSearch]
  );

  const handleSortChange = useCallback(
    (sort) => {
      setSortBy(sort);
      if (searchQuery?.trim()) {
        navigate(
          `/search?q=${encodeURIComponent(searchQuery)}&order=${sort.key}`,
          { replace: true }
        );
      }
    },
    [searchQuery, navigate]
  );

  return (
    <div className={styles.searchPage}>
      <SearchHeader
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSearch={handleSearch}
        onBackClick={handleBackClick}
      />

      <SearchFilters
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />

      <SearchSortSection
        totalElements={totalElements}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <SearchResults
        results={filteredAndSorted}
        onResultClick={handleResultClick}
        lastElementRef={lastElementRef}
        loading={loading}
        hasMore={hasMore}
      />
    </div>
  );
});

export default SearchPage;
