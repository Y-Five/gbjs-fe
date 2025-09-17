import { useEffect, useRef } from "react";
import styles from "./MapPreview.module.css";

export default function MapPreview({ courseData, selectedDay = 1 }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // 카카오맵 API 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
    }&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current && courseData) {
          initializeMap();
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [courseData, selectedDay]);

  const initializeMap = () => {
    if (!courseData || !courseData.dailyCourses) return;

    // 선택된 일차의 스팟만 수집
    const selectedDayCourse = courseData.dailyCourses.find(
      (course) => course.dayNumber === selectedDay
    );

    if (!selectedDayCourse) return;

    const allSpots = selectedDayCourse.spots.map((spot, index) => ({
      lat: spot.latitude,
      lng: spot.longitude,
      name: spot.name,
      isSealSpot: spot.isSealSpot,
      visitOrder: spot.visitOrder,
      order: index + 1,
    }));

    if (allSpots.length === 0) return;

    // 지도 중심점 계산 (모든 스팟의 중심)
    const centerLat =
      allSpots.reduce((sum, spot) => sum + spot.lat, 0) / allSpots.length;
    const centerLng =
      allSpots.reduce((sum, spot) => sum + spot.lng, 0) / allSpots.length;

    // 지도 생성
    const mapOption = {
      center: new window.kakao.maps.LatLng(centerLat, centerLng),
      level: 8,
    };

    mapInstance.current = new window.kakao.maps.Map(mapRef.current, mapOption);

    // 원과 숫자만 표시
    allSpots.forEach((spot, index) => {
      const markerPosition = new window.kakao.maps.LatLng(spot.lat, spot.lng);

      // 숫자가 있는 원만 표시하는 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: `<div style="
          background-color: #2d8ae7;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          margin-top: -16px;
          margin-left: -16px;
        ">${spot.visitOrder || spot.order}</div>`,
        yAnchor: 0.5,
      });

      customOverlay.setMap(mapInstance.current);
    });

    // 모든 마커가 보이도록 지도 범위 조정
    const bounds = new window.kakao.maps.LatLngBounds();
    allSpots.forEach((spot) => {
      bounds.extend(new window.kakao.maps.LatLng(spot.lat, spot.lng));
    });
    mapInstance.current.setBounds(bounds);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>여행 코스 지도</h3>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
}
