import sealIcon from "../../assets/images/sealCharacter.png";
import styles from './SavedCourseGuide.module.css';

export default function SavedCourseGuide() {
  return (
    <div className={styles.banner}>
      <div className={styles.textContainer}>
        <p className={styles.mainText}>스탬프 투어에서 저장한 코스를 확인해요!</p>
        <p className={styles.subText}>저장한 코스를 한 눈에 볼 수 있어요, 짹짹!</p>
      </div>
      <img src={sealIcon} alt="seal" className={styles.icon} />
    </div>
  );
}