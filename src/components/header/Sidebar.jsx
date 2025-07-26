import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, onClose, current = "home" }) {
  const menuItems = [
    { key: "home", label: "홈" },
    { key: "map", label: "띠부씰 지도" },
    { key: "product", label: "띠부씰 상품" },
    { key: "tour", label: "관광지 투어" },
    { key: "saved", label: "저장된 코스" },
  ];

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
              className={`${styles.menuItem} ${current === item.key ? styles.active : styles.inactive}`}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className={styles.divider} />
        <div className={styles.bottom}>마이페이지</div>
      </div>
    </div>
  );
}
