import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import banner1 from "../assets/images/login/banner1.png";
import banner2 from "../assets/images/login/banner2.jpeg";
import banner3 from "../assets/images/login/banner3.jpeg";
import banner4 from "../assets/images/login/banner4.jpeg";
import kakaoIcon from "../assets/images/login/kakao-icon.png";
import APIService from "../apis/axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const banners = [banner1, banner2, banner3, banner4];

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // 4초마다 슬라이드

    return () => clearInterval(interval);
  }, [banners.length]);

  // 수동 슬라이드 핸들러
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // 마우스 드래그 시작
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  // 마우스 드래그 중
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.clientX);
  };

  // 마우스 드래그 종료
  const handleMouseUp = () => {
    if (!isDragging) return;
    handleDragEnd();
  };

  // 터치 시작
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  // 터치 이동
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  };

  // 터치 종료
  const handleTouchEnd = () => {
    if (!isDragging) return;
    handleDragEnd();
  };

  // 드래그 종료 공통 로직
  const handleDragEnd = () => {
    if (!isDragging) return;

    const diffX = startX - currentX;
    const threshold = 50; // 최소 드래그 거리

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // 왼쪽으로 드래그 (다음 슬라이드)
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      } else {
        // 오른쪽으로 드래그 (이전 슬라이드)
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

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

  const handleTestLogin = async () => {
    try {
      setIsLoading(true);
      const response = await APIService.public.post("/api/auth/test-login");
      console.log("테스트 로그인 성공:", response);

      // 로그인 성공 후 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("테스트 로그인 실패:", error);
      alert("테스트 로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* 상단 컨텐츠 영역 */}
      <div className={styles.topContent}>
        {/* 배경 이미지 슬라이더 */}
        <div
          className={styles.backgroundSlider}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`${styles.backgroundSlide} ${
                index === currentSlide ? styles.active : ""
              }`}
              style={{ backgroundImage: `url(${banner})` }}
            />
          ))}
        </div>

        {/* 슬라이드 인디케이터 */}
        <div className={styles.slideIndicators}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.active : ""
              }`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
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
        {/* 테스트 로그인 버튼 */}
        <div className={styles.testLoginSection}>
          <button
            className={styles.testLoginButton}
            onClick={handleTestLogin}
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "테스트 로그인"}
          </button>
        </div>

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
