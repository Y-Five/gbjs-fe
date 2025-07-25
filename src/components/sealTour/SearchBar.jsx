import { AiOutlineSearch } from "react-icons/ai";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="경북의 어떤 관광지를 찾으세요?"
        className={styles.input}
      />
      <AiOutlineSearch className={styles.searchIcon} />
    </div>
  );
}
