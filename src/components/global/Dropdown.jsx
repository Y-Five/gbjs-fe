import { IoChevronDown } from "react-icons/io5";
import { useDropdown } from "../../hooks/useDropdown";
import styles from "./Dropdown.module.css";

export default function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "선택하세요",
  className = "",
  ariaLabel = "드롭다운 메뉴"
}) {
  const dropdown = useDropdown();

  const handleOptionClick = (option) => {
    onChange(option);
    dropdown.close();
  };

  const selectedOption = options.find(option => option.key === value) || { label: placeholder };

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdown.ref}>
      <button
        className={styles.dropdownButton}
        onClick={dropdown.toggle}
        aria-label={`${ariaLabel}: ${selectedOption.label}`}
        aria-expanded={dropdown.isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption.label}</span>
        <IoChevronDown 
          size={16} 
          className={`${styles.dropdownIcon} ${dropdown.isOpen ? styles.rotated : ''}`}
        />
      </button>
      {dropdown.isOpen && (
        <div className={styles.dropdownMenu} role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <button
              key={option.key}
              className={`${styles.dropdownOption} ${value === option.key ? styles.active : ''}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={value === option.key}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}