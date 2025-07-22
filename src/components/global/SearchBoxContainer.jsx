import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function SearchBoxContainer({
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
  
  const isControlled = value !== undefined && onChange;
  const searchValue = isControlled ? value : internalValue;
  const handleValueChange = isControlled ? onChange : setInternalValue;

  const handleSearch = () => {
    if (!onSearch) return;
    onSearch(searchValue.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    handleSearch();
  };

  const handleClick = () => {
    if (onInputClick) {
      onInputClick();
      return;
    }
    
    if (readOnly) {
      const searchQuery = searchValue ? `?q=${encodeURIComponent(searchValue)}` : "";
      navigate(`/search${searchQuery}`);
    }
  };

  const searchIconClickHandler = readOnly ? handleClick : handleSearch;

  return (
    <SearchBox
      placeholder={placeholder}
      searchValue={searchValue}
      onValueChange={(e) => handleValueChange(e.target.value)}
      onKeyPress={handleKeyPress}
      onClick={handleClick}
      onSearchIconClick={searchIconClickHandler}
      readOnly={readOnly}
      autoFocus={autoFocus}
      noMargin={noMargin}
      className={className}
    />
  );
}