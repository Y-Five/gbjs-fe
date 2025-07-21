import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/global";
import { SearchFilters, SearchResults } from "../components/search";
import { BackArrowIcon, DropdownIcon } from "../assets/icons";
import { useDropdown } from "../hooks/useDropdown";
import { SORT_OPTIONS, SEARCH_RESULTS_DATA, sortFunctions, filterFunction } from "../data/searchData";
import styles from "./SearchPage.module.css";
import mountainImg from "../assets/images/mountain.jpg";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);
  const dropdown = useDropdown();

  // 이미지와 함께 검색 결과 데이터 생성
  const enrichedResults = SEARCH_RESULTS_DATA.map(result => ({
    ...result,
    imageUrl: mountainImg
  }));

  useEffect(() => {
    setSearchResults(enrichedResults);
  }, []);

  // 필터링 및 정렬 적용
  useEffect(() => {
    let results = [...searchResults];
    
    // 필터 적용
    results = filterFunction(results, selectedFilter);
    
    // 정렬 적용
    const sortKey = sortBy.key;
    if (sortFunctions[sortKey]) {
      results = sortFunctions[sortKey](results);
    }
    
    setFilteredAndSorted(results);
  }, [searchResults, selectedFilter, sortBy]);


  const handleSearch = () => {
    console.log("검색:", searchQuery, "필터:", selectedFilter, "정렬:", sortBy);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.searchPage}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBackClick}
          aria-label="뒤로 가기"
        >
          <BackArrowIcon size="20" className={styles.backArrow} />
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

      {/* 필터 */}
      <SearchFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* 결과 헤더 */}
      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          총 <span className={styles.countNumber}>{filteredAndSorted.length}</span> 건
        </span>
        <div className={styles.sortDropdown} ref={dropdown.ref}>
          <button
            className={styles.dropdownButton}
            onClick={dropdown.toggle}
            aria-label={`정렬 방식: ${sortBy}`}
            aria-expanded={dropdown.isOpen}
            aria-haspopup="listbox"
          >
            <span>{sortBy.label}</span>
            <DropdownIcon 
              size="16" 
              rotated={dropdown.isOpen}
              className={styles.dropdownIcon}
            />
          </button>
          {dropdown.isOpen && (
            <div className={styles.dropdownMenu} role="listbox" aria-label="정렬 방식 선택">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
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

      {/* 검색 결과 */}
      <SearchResults
        results={filteredAndSorted}
        onResultClick={(result) => {
          console.log("결과 클릭:", result);
          navigate(-1);
        }}
      />
    </div>
  );
}
