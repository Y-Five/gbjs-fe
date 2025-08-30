import { LuChevronLeft } from 'react-icons/lu';
import { SearchBoxContainer as SearchBox } from '../global';
import styles from './SearchHeader.module.css';

export default function SearchHeader({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onBackClick,
}) {
  return (
    <div className={styles.header}>
      <button
        className={styles.backButton}
        onClick={onBackClick}
        aria-label="뒤로 가기"
      >
        <LuChevronLeft size={20} className={styles.backArrow} />
      </button>

      <SearchBox
        placeholder="경북의 어떤 관광지를 찾으세요?"
        value={searchQuery}
        onChange={onSearchQueryChange}
        onSearch={onSearch}
        autoFocus={true}
        noMargin={true}
        className={styles.searchSection}
      />
    </div>
  );
}
