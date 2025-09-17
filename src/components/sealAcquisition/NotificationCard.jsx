import styles from '../../pages/SealAcquisitionPage.module.css';
import magpieImage from '../../assets/images/seal-acquisition-illustration.png';

const NotificationCard = () => {
  return (
    <div className={styles.notificationCard}>
      <div className={styles.notificationContent}>
        <p className={styles.notificationText}>
          획득하기 버튼을 누르면{' '}
          <span className={styles.gpsHighlight}>GPS인증을</span>
          <br />
          <span className={styles.gpsHighlight}>통해</span> 경북씰을 획득할 수
          있어요!
        </p>
        <img
          src={magpieImage}
          alt="획득 안내"
          className={styles.notificationImage}
        />
      </div>
    </div>
  );
};

export default NotificationCard;
