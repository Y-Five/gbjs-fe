import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "home", label: "홈", path: "/" },
    { key: "map", label: "띠부씰 지도", path: "/sealtour" },
    { key: "product", label: "띠부씰 상품", path: "/sealtour" },
    { key: "tour", label: "관광지 투어", path: "/tour" },
    { key: "saved", label: "저장된 코스", path: "/course" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose(); // 사이드바 닫기
  };

  const handleMyPageClick = () => {
    navigate('/mypage');
    onClose(); // 사이드바 닫기
  };

  // 현재 경로를 기반으로 활성 메뉴 결정
  const getCurrentMenuKey = () => {
    const path = location.pathname;
    const menuItem = menuItems.find(item => item.path === path);
    return menuItem ? menuItem.key : null;
  };

  const currentMenuKey = getCurrentMenuKey();

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
      <div className={styles.sidebar}>
        <button className={styles.closeButton} onClick={() => {
          onClose();
        }}>✕</button>

        <div className={styles.topSection}>
          <h2 className={styles.title}>경북지색</h2>
        </div>

        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`${styles.menuItem} ${currentMenuKey === item.key ? styles.active : styles.inactive}`}
              onClick={() => handleMenuClick(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className={styles.divider} />
        <div 
          className={`${styles.bottom} ${location.pathname === '/mypage' ? styles.myPageActive : ''}`}
          onClick={handleMyPageClick}
        >
          마이페이지
        </div>
      </div>
    </div>
  );
}
