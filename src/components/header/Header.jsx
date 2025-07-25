<<<<<<< HEAD
import { useState } from "react";
import styles from "./Header.module.css";
import HeaderChatIcon from "../../assets/icons/HeaderChatIcon";
import HeaderMenuIcon from "../../assets/icons/HeaderMenuIcon";
import Sidebar from "./Sidebar";

export default function Header({ title = "경북지색", isDark = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  return (
    <>
      <header className={`${styles.header} ${isDark ? styles.dark : ''}`}>
        <h1 className={`${styles.title} ${isDark ? styles.darkTitle : ''}`}>{title}</h1>
        <div className={styles.rightIcons}>
          <HeaderChatIcon className={`${styles.chatIcon} ${isDark ? styles.darkIcon : ''}`} />
          <div
            className={`${styles.menuIcon} ${isDark ? styles.darkIcon : ''}`}
            onClick={handleMenuClick}
            style={{ cursor: "pointer" }} // 클릭 가능하도록
          >
            <HeaderMenuIcon />
          </div>
        </div>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
=======
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { RiChatAiLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header({ title = "경북지색", isDark = false }) {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <header className={`${styles.header} ${isDark ? styles.dark : ''}`}>
      <h1 className={`${styles.title} ${isDark ? styles.darkTitle : ''}`}>{title}</h1>
      <div className={styles.rightIcons}>
        <button 
          className={styles.iconButton} 
          onClick={handleChatClick}
          aria-label="채팅 페이지로 이동"
        >
          <RiChatAiLine className={`${styles.chatIcon} ${isDark ? styles.darkIcon : ''}`} size={24} />
        </button>
        <button 
          className={styles.iconButton}
          aria-label="메뉴 열기"
        >
          <RxHamburgerMenu className={`${styles.menuIcon} ${isDark ? styles.darkIcon : ''}`} size={24} />
        </button>
      </div>
    </header>
>>>>>>> develop
  );
}
