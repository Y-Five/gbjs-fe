import { Dropdown } from '../global';
import styles from '../../pages/AllSealsPage.module.css';

export default function SortSection({ sortBy, sortOptions, onSortChange }) {
  return (
    <div className={styles.sortSection}>
      <Dropdown
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
        ariaLabel="정렬 방식"
      />
    </div>
  );
}
