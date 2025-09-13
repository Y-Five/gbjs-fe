import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import backgroundImage from "../assets/images/login/background.jpg";
import kakaoIcon from "../assets/images/login/kakao-icon.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = () => {
    setIsLoading(true);
    // 카카오 OAuth2 인증 URL로 이동
    window.location.href = "https://api.gbjs.co.kr/oauth2/authorization/kakao";
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* 배경 이미지 */}
      <div className={styles.backgroundImage}>
        <img
          src={backgroundImage}
          alt="배경"
          className={styles.backgroundImg}
        />
      </div>

      {/* 페이지 인디케이터 */}
      <div className={styles.pageIndicator}>
        <div className={styles.indicatorDot}></div>
        <div className={styles.indicatorDot}></div>
        <div className={styles.indicatorDot}></div>
        <div className={styles.activeIndicator}></div>
      </div>

      {/* 앱 로고 및 타이틀 */}
      <div className={styles.logoSection}>
        <h1 className={styles.appTitle}>경북지색</h1>
        <p className={styles.appSubtitle}>慶北之色</p>
      </div>

      {/* 설명 텍스트 */}
      <div className={styles.descriptionSection}>
        <p className={styles.description}>
          '傾國之色' 단순히 미모를 넘어 그 아름다움이 정치,
          <br />
          사회적 영향을 미칠 수 있는 강력한 힘을 상징합니다.
        </p>
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className={styles.loginSection}>
        <button
          className={styles.kakaoLoginButton}
          onClick={handleKakaoLogin}
          disabled={isLoading}
        >
          <div className={styles.kakaoIcon}>
            <img src={kakaoIcon} alt="카카오" />
          </div>
          <span className={styles.kakaoText}>카카오로 간편한 로그인</span>
        </button>
      </div>

      {/* 건너뛰기 버튼 */}
      <div className={styles.skipSection}>
        <button className={styles.skipButton} onClick={handleSkip}>
          <span className={styles.skipText}>Skip for now</span>
          <div className={styles.skipUnderline}></div>
        </button>
      </div>
    </div>
  );
}
