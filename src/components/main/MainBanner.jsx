import { useState, useEffect } from "react";
import styles from "./MainBanner.module.css";
import bannerImg from "../../assets/images/main-banner.png";
import banner1 from "../../assets/images/main/banner1.png";
import banner2 from "../../assets/images/main/banner2.png";

export default function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const banners = [bannerImg, banner1, banner2];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

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

  return (
    <section className={styles.banner}>
      <div
        className={styles.slider}
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
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${banner})` }}
          />
        ))}
      </div>
      <div className={styles.overlay}>
        <nav className={styles.tabMenu}>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("weatherSection")}
          >
            경북날씨
          </button>
          <p>|</p>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("courseSection")}
          >
            여행코스
          </button>
          <p>|</p>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("eventSection")}
          >
            행사지도
          </button>
          <p>|</p>
          <button
            className={styles.tab}
            onClick={() => scrollToSection("productSection")}
          >
            전통상품
          </button>
        </nav>
        {/* <div className={styles.slideIndicators}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.active : ""
              }`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
