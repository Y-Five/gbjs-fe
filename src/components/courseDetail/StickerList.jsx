import styles from "./StickerList.module.css";
import Seal from "../../assets/images/띠부실.png";

export default function StickerList({ stickers }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>수집 가능한 띠부씰 리스트</p>
      <div className={styles.grid}>
        {stickers.map((s, i) => (
          <div key={i} className={styles.card}>
            <img src={Seal} className={styles.img} />
            {s.collected && <p className={styles.collected}>수집완료</p>}
            <p className={styles.name}>{s.title} &gt;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
