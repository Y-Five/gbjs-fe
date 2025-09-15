import { useState, useCallback, useRef, useEffect, memo } from 'react';
import { PiPlayFill } from 'react-icons/pi';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import magpieImg from '../../assets/images/place-detail-magpie.png';
import { useScrollGradient } from '../../hooks/useScrollGradient';
import styles from './VoiceGuide.module.css';

const PROGRESS_MIN_WIDTH = 1.5;

const VoiceGuide = memo(function VoiceGuide({
  placeData,
  audioControls,
  selectedTtsIndex,
  onTtsChange,
}) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isSwipeAnimating, setIsSwipeAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const lastActionTime = useRef(0);

  const {
    isPlaying,
    currentTime,
    duration,
    handlePlayPause,
    handleProgressClick,
    formatTime,
  } = audioControls;

  const { scrollRef, showLeftGradient, showRightGradient, checkScroll } =
    useScrollGradient();

  // 선택된 탭을 중앙으로 스크롤
  const scrollToSelectedTab = useCallback(() => {
    if (
      scrollRef.current &&
      placeData.ttsList &&
      placeData.ttsList.length > 1
    ) {
      const selectedButton = scrollRef.current.children[selectedTtsIndex];
      if (selectedButton) {
        const containerWidth = scrollRef.current.offsetWidth;
        const buttonLeft = selectedButton.offsetLeft;
        const buttonWidth = selectedButton.offsetWidth;
        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

        scrollRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedTtsIndex, placeData.ttsList, scrollRef]);

  const currentTts =
    placeData.ttsList?.[selectedTtsIndex] || placeData.ttsList?.[0];

  // selectedTtsIndex가 변경될 때마다 탭 스크롤
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSelectedTab();
    }, 100); // DOM 업데이트 후 실행

    return () => clearTimeout(timer);
  }, [selectedTtsIndex, scrollToSelectedTab]);

  const handleSubtitleToggle = useCallback(() => {
    setShowSubtitle((prev) => !prev);
  }, []);

  // 중복 실행 방지 함수
  const canExecuteAction = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTime.current < 300) {
      return false;
    }
    lastActionTime.current = now;
    return true;
  }, []);

  // TTS 변경 핵심 함수
  const changeTts = useCallback(
    (newIndex) => {
      if (!canExecuteAction()) return;

      onTtsChange(newIndex);

      // 재생 중이면 정지
      if (isPlaying) {
        handlePlayPause();
      }

      // 플레이 시간 초기화
      if (audioControls.handleSeek) {
        audioControls.handleSeek(0);
      }
    },
    [onTtsChange, isPlaying, handlePlayPause, audioControls, canExecuteAction]
  );

  const handlePreviousTts = useCallback(() => {
    if (placeData.ttsList && placeData.ttsList.length > 0) {
      const newIndex =
        selectedTtsIndex > 0
          ? selectedTtsIndex - 1
          : placeData.ttsList.length - 1;
      changeTts(newIndex);
    }
  }, [selectedTtsIndex, placeData.ttsList, changeTts]);

  const handleNextTts = useCallback(() => {
    if (placeData.ttsList && placeData.ttsList.length > 0) {
      const newIndex =
        selectedTtsIndex < placeData.ttsList.length - 1
          ? selectedTtsIndex + 1
          : 0;
      changeTts(newIndex);
    }
  }, [selectedTtsIndex, placeData.ttsList, changeTts]);

  const handleTabClick = useCallback(
    (index) => {
      changeTts(index);
    },
    [changeTts]
  );

  // TTS 변경 공통 로직
  const changeTtsWithReset = useCallback(
    (newIndex) => {
      // 재생 중이면 정지
      if (isPlaying) {
        handlePlayPause();
      }

      // TTS 변경
      onTtsChange(newIndex);

      // 플레이 시간 초기화
      if (audioControls.handleSeek) {
        audioControls.handleSeek(0);
      }
    },
    [isPlaying, handlePlayPause, onTtsChange, audioControls]
  );

  const handleSwipe = useCallback(() => {
    // 애니메이션 중이면 스와이프 무시
    if (isSwipeAnimating) {
      return;
    }

    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      const isSwipeLeft = swipeDistance > 0;
      const direction = isSwipeLeft ? 'left' : 'right';

      setSwipeDirection(direction);
      setIsSwipeAnimating(true);

      // TTS 변경
      if (placeData.ttsList && placeData.ttsList.length > 0) {
        const newIndex = isSwipeLeft
          ? selectedTtsIndex < placeData.ttsList.length - 1
            ? selectedTtsIndex + 1
            : 0
          : selectedTtsIndex > 0
          ? selectedTtsIndex - 1
          : placeData.ttsList.length - 1;

        changeTtsWithReset(newIndex);
      }

      // 애니메이션 완료 후 상태 초기화
      setTimeout(() => {
        setIsSwipeAnimating(false);
        setSwipeDirection('');
      }, 300);
    }
  }, [
    isSwipeAnimating,
    selectedTtsIndex,
    placeData.ttsList,
    changeTtsWithReset,
  ]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    // 터치 이동 중에는 스크롤 방지
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (!isDragging.current) return;
      touchEndX.current = e.changedTouches[0].clientX;
      handleSwipe();
      isDragging.current = false;
    },
    [handleSwipe]
  );

  const handleMouseDown = useCallback((e) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(
    (e) => {
      if (!isDragging.current) return;
      touchEndX.current = e.clientX;
      handleSwipe();
      isDragging.current = false;
    },
    [handleSwipe]
  );

  const progressPercentage =
    duration > 0
      ? Math.max((currentTime / duration) * 100, PROGRESS_MIN_WIDTH)
      : 0;

  return (
    <div className={styles.voiceGuideContainer}>
      <h2 className={styles.voiceGuideTitle}>TTS 음성 가이드</h2>

      {placeData.ttsList && placeData.ttsList.length > 1 && (
        <div className={styles.ttsSelectorWrapper}>
          <div
            ref={scrollRef}
            className={styles.ttsSelector}
            onScroll={checkScroll}
          >
            {placeData.ttsList.map((tts, index) => (
              <button
                key={tts.guideId}
                className={`${styles.ttsOption} ${
                  selectedTtsIndex === index ? styles.selected : ''
                }`}
                onClick={() => handleTabClick(index)}
              >
                {tts.title}
              </button>
            ))}
          </div>
          {showLeftGradient && <div className={styles.leftGradient} />}
          {showRightGradient && <div className={styles.rightGradient} />}
        </div>
      )}

      <div className={styles.voiceGuideWrapper}>
        {/* 까치 이미지 - 박스 밖에 위치 */}
        <img src={magpieImg} alt="까치" className={styles.magpieImage} />

        <div
          className={`${styles.voiceGuideCard} ${
            isSwipeAnimating
              ? swipeDirection === 'left'
                ? styles.swipeLeft
                : styles.swipeRight
              : ''
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* 슬라이드 네비게이션 */}
          {placeData.ttsList && placeData.ttsList.length > 1 && (
            <div className={styles.slideNavigation}>
              <button
                className={styles.navButton}
                onClick={handlePreviousTts}
                aria-label="이전 음성 가이드"
              >
                <IoChevronBack size={20} />
              </button>
              <div className={styles.slideIndicator}>
                {placeData.ttsList.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicatorDot} ${
                      selectedTtsIndex === index ? styles.active : ''
                    }`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`음성 가이드 ${index + 1}`}
                  />
                ))}
              </div>
              <button
                className={styles.navButton}
                onClick={handleNextTts}
                aria-label="다음 음성 가이드"
              >
                <IoChevronForward size={20} />
              </button>
            </div>
          )}

          <div className={styles.cardContent}>
            <div className={styles.audioControls}>
              <button
                className={`${styles.playButton} ${
                  isPlaying ? styles.playing : ''
                }`}
                onClick={handlePlayPause}
                aria-label={isPlaying ? '음성 가이드 정지' : '음성 가이드 재생'}
              >
                <span className={styles.playText}>
                  {isPlaying ? '음성 가이드 정지하기' : '음성 가이드 재생하기'}
                </span>
                {isPlaying ? (
                  <div className={styles.pauseIcon}>
                    <span className={styles.pauseBar}></span>
                    <span className={styles.pauseBar}></span>
                  </div>
                ) : (
                  <PiPlayFill className={styles.playIcon} size={16} />
                )}
              </button>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressTrack}
                  onClick={handleProgressClick}
                  role="slider"
                  aria-label="재생 진행률"
                  aria-valuenow={currentTime}
                  aria-valuemin={0}
                  aria-valuemax={duration}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <div className={styles.timeInfo}>
                <span className={styles.currentTime}>
                  {formatTime(currentTime)}
                </span>
                <span className={styles.duration}>{formatTime(duration)}</span>
              </div>
            </div>

            <div className={styles.dividerInCard} />

            <button
              className={styles.subtitleButton}
              onClick={handleSubtitleToggle}
              aria-expanded={showSubtitle}
            >
              {showSubtitle ? '자막 닫기' : '자막 보기'}
            </button>

            {showSubtitle && (
              <div className={styles.subtitleContent}>
                <p>{currentTts?.script || placeData.voiceGuideText}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSubtitle && (
        <button
          className={styles.floatingControlButton}
          onClick={handlePlayPause}
          aria-label={isPlaying ? '음성 가이드 정지' : '음성 가이드 재생'}
        >
          {isPlaying ? (
            <div className={styles.floatingPauseIcon}>
              <span className={styles.floatingPauseBar}></span>
              <span className={styles.floatingPauseBar}></span>
            </div>
          ) : (
            <PiPlayFill className={styles.floatingPlayIcon} size={22} />
          )}
        </button>
      )}
    </div>
  );
});

export default VoiceGuide;
