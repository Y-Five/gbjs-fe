import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./SearchBox.module.css";

export default function SearchBox({
  placeholder,
  searchValue,
  onValueChange,
  onKeyPress,
  onClick,
  onSearchIconClick,
  readOnly,
  autoFocus,
  noMargin,
  className,
}) {
  const containerClassName = [
    styles.searchSection,
    noMargin && styles.noMargin,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
          value={searchValue}
          onChange={onValueChange}
          onKeyPress={onKeyPress}
          onClick={onClick}
          readOnly={readOnly}
          autoFocus={autoFocus}
        />
        <SearchIcon 
          className={styles.searchIcon} 
          onClick={onSearchIconClick} 
        />
      </div>
    </div>
  );
}