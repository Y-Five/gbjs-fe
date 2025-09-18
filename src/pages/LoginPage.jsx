import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import backgroundImage from "../assets/images/login/background.jpg";
import kakaoIcon from "../assets/images/login/kakao-icon.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const handleKakaoLogin = () => {
    if (!isTermsAgreed) return;
    setIsLoading(true);
    // 카카오 OAuth2 인증 URL로 이동
    window.location.href = "https://api.gbjs.co.kr/oauth2/authorization/kakao";
  };

  const handleTermsChange = (e) => {
    setIsTermsAgreed(e.target.checked);
  };

  const handleTermsDetail = () => {
    navigate("/terms-detail");
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* 상단 컨텐츠 영역 */}
      <div className={styles.topContent}>
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
      </div>

      {/* 하단 컨텐츠 영역 */}
      <div className={styles.bottomContent}>
        {/* 위치정보 동의 약관 */}
        <div className={styles.termsSection}>
          <div className={styles.termsContainer}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={isTermsAgreed}
                onChange={handleTermsChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              <span className={styles.termsText}>
                위치정보 수집·이용·보유 동의 (필수)
              </span>
            </label>
            <button
              className={styles.termsDetailButton}
              onClick={handleTermsDetail}
              type="button"
            >
              자세히보기
            </button>
          </div>
        </div>

        {/* 카카오 로그인 버튼 */}
        <div className={styles.loginSection}>
          <button
            className={`${styles.kakaoLoginButton} ${
              !isTermsAgreed ? styles.disabled : ""
            }`}
            onClick={handleKakaoLogin}
            disabled={isLoading || !isTermsAgreed}
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
    </div>
  );
}
