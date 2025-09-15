import styles from '../../pages/SealShopPage.module.css';
import magpieImage from '../../assets/images/magpie2.png';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <p className={styles.bannerMainText}>
          자신이 모은 경북씰과
          <br />
          교환할 수 있는 상품을 확인해봐요!
        </p>
        <p className={styles.bannerSubText}>
          수집 경북씰을 한 눈에 볼 수 있어요, 짹짹!
        </p>
        <img src={magpieImage} alt="짹짹이" className={styles.magpieImage} />
      </div>
    </div>
  );
};

export default Banner;
