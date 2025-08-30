import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';

export default function SearchBoxContainer({
  placeholder = '찾고 있는 장소가 있나요?',
  onSearch,
  onInputClick,
  value = '',
  onChange,
  readOnly = false,
  autoFocus = false,
  noMargin = false,
  className = '',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [internalValue, setInternalValue] = useState('');

  const isControlled = value !== undefined && onChange;
  const searchValue = isControlled ? value : internalValue;
  const handleValueChange = isControlled ? onChange : setInternalValue;

  const handleSearch = () => {
    if (!onSearch) return;
    onSearch(searchValue.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') return;
    handleSearch();
  };

  const handleClick = () => {
    if (onInputClick) {
      onInputClick();
      return;
    }

    if (readOnly) {
      const searchQuery = searchValue
        ? `?q=${encodeURIComponent(searchValue)}`
        : '';
      navigate(`/search${searchQuery}`, {
        state: { from: location.pathname },
      });
    }
  };

  const handleInputChange = (e) => {
    handleValueChange(e.target.value);
  };

  return (
    <SearchBox
      placeholder={placeholder}
      searchValue={searchValue}
      onValueChange={handleInputChange}
      onKeyPress={handleKeyPress}
      onClick={handleClick}
      onSearchIconClick={readOnly ? handleClick : handleSearch}
      readOnly={readOnly}
      autoFocus={autoFocus}
      noMargin={noMargin}
      className={className}
    />
  );
}
