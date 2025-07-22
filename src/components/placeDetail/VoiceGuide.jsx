import { useState, useCallback } from "react";
import PlayIcon from "../../assets/icons/PlayIcon";
import magpieImg from "../../assets/images/magpie.png";
import styles from "./VoiceGuide.module.css";

const PROGRESS_MIN_WIDTH = 1.5;

export default function VoiceGuide({ placeData, audioControls }) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const {
    isPlaying,
    currentTime,
    duration,
    handlePlayPause,
    handleProgressClick,
    formatTime,
  } = audioControls;

  const handleSubtitleToggle = useCallback(() => {
    setShowSubtitle(prev => !prev);
  }, []);

  const progressPercentage = duration > 0 
    ? Math.max((currentTime / duration) * 100, PROGRESS_MIN_WIDTH) 
    : 0;

  return (
    <>
      <h2 className={styles.voiceGuideTitle}>TTS 음성 가이드</h2>

      <div className={styles.voiceGuideWrapper}>
        <div className={styles.voiceGuideCard}>
          <img src={magpieImg} alt="까치" className={styles.mascot} />

          <div className={styles.audioControls}>
            <button
              className={`${styles.playButton} ${
                isPlaying ? styles.playing : ""
              }`}
              onClick={handlePlayPause}
              aria-label={isPlaying ? "음성 가이드 정지" : "음성 가이드 재생"}
            >
              <span className={styles.playText}>
                {isPlaying ? "음성 가이드 정지하기" : "음성 가이드 재생하기"}
              </span>
              {isPlaying ? (
                <div className={styles.pauseControls}>
                  <div className={styles.pauseBar} />
                  <div className={styles.pauseBar} />
                </div>
              ) : (
                <PlayIcon className={styles.playIcon} />
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
            {showSubtitle ? "자막 닫기" : "자막 보기"}
          </button>

          {showSubtitle && (
            <div className={styles.subtitleContent}>
              <p>{placeData.voiceGuideText}</p>
            </div>
          )}
        </div>
      </div>

      {showSubtitle && (
        <button
          className={styles.floatingControlButton}
          onClick={handlePlayPause}
          aria-label={isPlaying ? "음성 가이드 정지" : "음성 가이드 재생"}
        >
          {isPlaying ? (
            <div className={styles.pauseIcon}>
              <div className={styles.pauseBar} />
              <div className={styles.pauseBar} />
            </div>
          ) : (
            <PlayIcon className={styles.floatingPlayIcon} />
          )}
        </button>
      )}
    </>
  );
}