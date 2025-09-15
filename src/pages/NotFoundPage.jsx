import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import notFoundImage from '../assets/images/404.png';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <img
            src={notFoundImage}
            alt="404 Not Found"
            className={styles.image}
          />

          <div className={styles.textSection}>
            <h1 className={styles.title}>404 Page not found</h1>
            <p className={styles.description}>
              방문하시려는 페이지를 찾을 수 없습니다.
              <br />
              입력하신 주소를 다시 확인해주세요.
            </p>
          </div>

          <button onClick={handleGoHome} className={styles.homeButton}>
            홈으로 돌아가기
          </button>
        </div>
      </main>
    </div>
  );
}
