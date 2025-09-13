import { useEffect, useRef } from "react";
import styles from "./MapPreview.module.css";

export default function MapPreview({ courseData }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // 카카오맵 API 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
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
  }, [courseData]);

  const initializeMap = () => {
    if (!courseData || !courseData.dailyCourses) return;

    // 모든 스팟의 좌표를 수집
    const allSpots = [];
    courseData.dailyCourses.forEach((dailyCourse) => {
      dailyCourse.spots.forEach((spot) => {
        allSpots.push({
          lat: spot.latitude,
          lng: spot.longitude,
          name: spot.name,
          isSealSpot: spot.isSealSpot,
        });
      });
    });

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

    // 마커 생성
    allSpots.forEach((spot, index) => {
      const markerPosition = new window.kakao.maps.LatLng(spot.lat, spot.lng);

      // 띠부씰 스팟은 다른 색상의 마커 사용
      const markerImage = spot.isSealSpot
        ? new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new window.kakao.maps.Size(24, 35),
            { offset: new window.kakao.maps.Point(12, 35) }
          )
        : undefined;

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(mapInstance.current);

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px; font-size:12px;">${spot.name}</div>`,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(mapInstance.current, marker);
      });
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
