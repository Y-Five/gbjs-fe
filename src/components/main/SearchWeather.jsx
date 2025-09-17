import { useState, useEffect } from "react";
import styles from "./SearchWeather.module.css";
import { SearchBoxContainer as SearchBox } from "../global";
import { useGeolocation } from "../../hooks/useGeolocation";
import { weatherService } from "../../apis/main";

export default function SearchWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useGeolocation();

  // 위치 정보가 로드되면 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (
        !location.loaded ||
        !location.coordinates.lat ||
        !location.coordinates.lng
      ) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await weatherService.getWeather(
          location.coordinates.lng,
          location.coordinates.lat
        );
        setWeatherData(data);
      } catch (err) {
        setError(err.message || "날씨 정보를 가져올 수 없습니다.");
        console.error("날씨 데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (
      location.loaded &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      fetchWeatherData();
    }
  }, [location.loaded, location.coordinates.lat, location.coordinates.lng]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${month}월 ${day}일 (${weekday})`;
  };

  // 위치 정보 포맷팅
  const getLocationText = () => {
    if (!location.loaded) return "위치 정보 로딩 중...";
    if (location.error) return "위치 정보를 가져올 수 없습니다";
    return `${formatDate(new Date())} `;
  };

  return (
    <section className={styles.section}>
      <SearchBox
        placeholder="경북의 어떤 관광지를 찾으세요?"
        readOnly={true}
        className={styles.searchBoxComponent}
      />

      <div className={styles.weatherCard}>
        <div className={styles.weatherInfo}>
          <div className={styles.highSection}>
            <p className={styles.title}>
              {location.loaded && location.address.city ? (
                <>
                  <span className={styles.cityName}>
                    {location.address.city}
                  </span>
                  <span className={styles.weatherText}>의 날씨</span>
                </>
              ) : (
                "현재날씨"
              )}
            </p>
            <p className={styles.location}>{getLocationText()}</p>
          </div>
          <div className={styles.lowSection}>
            {loading ? (
              <div className={styles.loading}>날씨 정보 로딩 중...</div>
            ) : error ? (
              <div className={styles.error}>날씨 정보를 가져올 수 없습니다</div>
            ) : weatherData ? (
              <>
                <div className={styles.temperature}>
                  <span className={styles.low}>
                    {weatherData.data?.lowestTemperature || "--"}
                  </span>
                  |
                  <span className={styles.high}>
                    {weatherData.data?.highestTemperature || "--"}
                  </span>
                </div>
                <p className={styles.description}>
                  {weatherData.data?.temperature || "--"}°C,{" "}
                  {weatherData.data?.weather || "정보 없음"}
                </p>
              </>
            ) : (
              <div className={styles.noData}>날씨 정보 없음</div>
            )}
          </div>
        </div>
        {weatherData?.data?.imageUrl && (
          <img
            src={weatherData.data.imageUrl}
            alt="날씨 캐릭터"
            className={styles.character}
          />
        )}
      </div>
    </section>
  );
}
