import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBoxContainer as SearchBox } from "../components/global";
import { SearchFilters, SearchResults } from "../components/search";
import { IoChevronDown } from "react-icons/io5";
import { LuChevronLeft } from "react-icons/lu";
import { useDropdown } from "../hooks/useDropdown";
import { SORT_OPTIONS, sortFunctions, filterFunction, SEARCH_RESULTS_DATA } from "../data/searchData";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [searchResults, setSearchResults] = useState([]);
  const dropdown = useDropdown();

  useEffect(() => {
    setSearchResults(SEARCH_RESULTS_DATA);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let results = [...searchResults];
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        item.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    results = filterFunction(results, selectedFilter);
    
    const sortKey = sortBy.key;
    if (sortFunctions[sortKey]) {
      results = sortFunctions[sortKey](results);
    }
    
    return results;
  }, [searchResults, searchQuery, selectedFilter, sortBy]);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleBackClick = () => navigate(-1);
  const handleResultClick = (result) => navigate(`/place/${result.id}`);

  return (
    <div className={styles.searchPage}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBackClick}
          aria-label="뒤로 가기"
        >
          <LuChevronLeft size={20} className={styles.backArrow} />
        </button>

        <SearchBox
          placeholder="경북의 어떤 관광지를 찾으세요?"
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          autoFocus={true}
          noMargin={true}
          className={styles.searchSection}
        />
      </div>

      <SearchFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          총 <span className={styles.countNumber}>{filteredAndSorted.length}</span> 건
        </span>
        <div className={styles.sortDropdown} ref={dropdown.ref}>
          <button
            className={styles.dropdownButton}
            onClick={dropdown.toggle}
            aria-label={`정렬 방식: ${sortBy.label}`}
            aria-expanded={dropdown.isOpen}
            aria-haspopup="listbox"
          >
            <span>{sortBy.label}</span>
            <IoChevronDown 
              size={16} 
              className={`${styles.dropdownIcon} ${dropdown.isOpen ? styles.rotated : ''}`}
            />
          </button>
          {dropdown.isOpen && (
            <div className={styles.dropdownMenu} role="listbox" aria-label="정렬 방식 선택">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  className={`${styles.dropdownOption} ${sortBy.key === option.key ? styles.active : ''}`}
                  onClick={() => {
                    setSortBy(option);
                    dropdown.close();
                  }}
                  role="option"
                  aria-selected={sortBy.key === option.key}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <SearchResults
        results={filteredAndSorted}
        onResultClick={handleResultClick}
      />
    </div>
  );
}