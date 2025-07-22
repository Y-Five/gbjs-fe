import { useState, useEffect, useRef, useCallback } from "react";

const TIMER_INTERVAL = 1000;

export const useAudioPlayer = (audioUrl, defaultDuration = 90) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(defaultDuration);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!audioUrl) {
      setDuration(defaultDuration);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => setDuration(Math.round(audio.duration));
    const handleTimeUpdate = () => setCurrentTime(Math.floor(audio.currentTime));
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleError = () => {
      setDuration(defaultDuration);
      audioRef.current = null;
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [audioUrl, defaultDuration]);

  useEffect(() => {
    if (!isPlaying || audioRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration - 1) {
          setIsPlaying(false);
          return duration;
        }
        return prev + 1;
      });
    }, TIMER_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const handlePlayPause = useCallback(async () => {
    if (!audioRef.current) {
      setIsPlaying((prev) => !prev);
      if (!isPlaying && currentTime >= duration) {
        setCurrentTime(0);
      }
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.ended || currentTime >= duration) {
          audioRef.current.currentTime = 0;
          setCurrentTime(0);
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      setIsPlaying(true);
    }
  }, [isPlaying, currentTime, duration]);

  const handleProgressClick = useCallback((e) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickPercentage = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(duration * Math.max(0, Math.min(1, clickPercentage)));

    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, [duration]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    handlePlayPause,
    handleProgressClick,
    formatTime,
  };
};