import styles from "./Header.module.css";
import HeaderChatIcon from "../../assets/icons/HeaderChatIcon";
import HeaderMenuIcon from "../../assets/icons/HeaderMenuIcon";

export default function Header({ title = "경북지색", isDark = false }) {
  return (
    <header className={`${styles.header} ${isDark ? styles.dark : ''}`}>
      <h1 className={`${styles.title} ${isDark ? styles.darkTitle : ''}`}>{title}</h1>
      <div className={styles.rightIcons}>
        <HeaderChatIcon className={`${styles.chatIcon} ${isDark ? styles.darkIcon : ''}`} />
        <HeaderMenuIcon className={`${styles.menuIcon} ${isDark ? styles.darkIcon : ''}`} />
      </div>
    </header>
  );
}
