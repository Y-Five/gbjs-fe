import styles from "./Header.module.css";
import { BsChatDots } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>경북지색</h1>
      <div className={styles.rightIcons}>
        <BsChatDots className={styles.icon} />
        <FiMenu className={styles.icon} />
      </div>
    </header>
  );
}
