import { useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./SearchBox.module.css";

export default function SearchBox({
  placeholder = "찾고 있는 장소가 있나요?",
  onSearch,
  className = "",
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`${styles.searchSection} ${className}`}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchIcon className={styles.searchIcon} onClick={handleSearch} />
      </div>
    </div>
  );
}
