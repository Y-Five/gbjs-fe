import { IoChevronDown } from 'react-icons/io5';
import { useDropdown } from '../../hooks/useDropdown';
import styles from './SearchSortSection.module.css';

const SORT_OPTIONS = [
  { key: 'DISTANCE', label: '거리순' },
  { key: 'ABC', label: '이름순' },
];

export default function SearchSortSection({
  totalElements,
  sortBy,
  onSortChange,
}) {
  const dropdown = useDropdown();

  return (
    <div className={styles.resultsHeader}>
      <span className={styles.resultsCount}>
        총 <span className={styles.countNumber}>{totalElements}</span> 건
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
            className={`${styles.dropdownIcon} ${
              dropdown.isOpen ? styles.rotated : ''
            }`}
          />
        </button>
        {dropdown.isOpen && (
          <div
            className={styles.dropdownMenu}
            role="listbox"
            aria-label="정렬 방식 선택"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                className={`${styles.dropdownOption} ${
                  sortBy.key === option.key ? styles.active : ''
                }`}
                onClick={() => {
                  onSortChange(option);
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
  );
}
