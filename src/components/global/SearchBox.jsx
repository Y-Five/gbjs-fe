import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./SearchBox.module.css";

export default function SearchBox({
  placeholder = "찾고 있는 장소가 있나요?",
  onSearch,
  onInputClick,
  value = "",
  onChange,
  readOnly = false,
  autoFocus = false,
  noMargin = false,
  className = "",
}) {
  const navigate = useNavigate();
  const [internalValue, setInternalValue] = useState("");
  
  // value와 onChange가 제공되면 controlled component로, 아니면 uncontrolled로 동작
  const searchValue = value !== undefined && onChange ? value : internalValue;
  const handleValueChange = value !== undefined && onChange ? onChange : setInternalValue;

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = () => {
    if (onInputClick) {
      onInputClick();
    } else if (readOnly) {
      // readOnly이고 onInputClick이 없으면 검색 페이지로 이동
      navigate(`/search${searchValue ? `?q=${encodeURIComponent(searchValue)}` : ""}`);
    }
  };

  return (
    <div className={`${styles.searchSection} ${noMargin ? styles.noMargin : ''} ${className}`}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
          value={searchValue}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onClick={handleClick}
          readOnly={readOnly}
          autoFocus={autoFocus}
        />
        <SearchIcon className={styles.searchIcon} onClick={readOnly ? handleClick : handleSearch} />
      </div>
    </div>
  );
}
