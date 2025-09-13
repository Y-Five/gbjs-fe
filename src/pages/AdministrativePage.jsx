import { useState, useEffect } from "react";
import BackHeader from "../components/header/BackHeader";
import RegionSelector from "../components/sealTour/RegionSelector";
import StickerList from "../components/courseDetail/StickerList";
import styles from "./AdministrativePage.module.css";

export default function AdministrativePage() {
  const [regionSealsData, setRegionSealsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isLoadingSeals, setIsLoadingSeals] = useState(false);

  useEffect(() => {
    // localStorage에서 띠부씰 데이터 가져오기
    const savedData = localStorage.getItem("regionSealsData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setRegionSealsData(data);
        setSelectedLocations(data.selectedLocations || []);
      } catch (error) {
        console.error("띠부씰 데이터 파싱 실패:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleRegionSelect = async (selected) => {
    console.log("선택된 지역:", selected);

    // 지역 선택/취소 처리
    let newSelectedLocations;
    if (Array.isArray(selected)) {
      // 전체 선택/취소
      newSelectedLocations = selected;
    } else {
      // 개별 지역 선택/취소
      if (selectedLocations.includes(selected)) {
        newSelectedLocations = selectedLocations.filter(
          (loc) => loc !== selected
        );
      } else {
        newSelectedLocations = [...selectedLocations, selected];
      }
    }

    setSelectedLocations(newSelectedLocations);

    // 지역이 모두 취소되면 띠부씰 목록 초기화
    if (newSelectedLocations.length === 0) {
      setRegionSealsData(null);
      return;
    }

    // API 호출하여 띠부씰 조회
    setIsLoadingSeals(true);
    try {
      const { sealtourService } = await import("../apis/sealtour");
      const response = await sealtourService.getSealsByLocation(
        "NUMBER", // 기본 정렬
        newSelectedLocations
      );

      if (response.code === "SUCCESS") {
        setRegionSealsData({
          seals: response.data.seals || [],
          totalCount: response.data.totalCount || 0,
          collectedCount: response.data.collectedCount || 0,
          selectedLocations: newSelectedLocations,
          sortBy: "NUMBER",
        });
      }
    } catch (error) {
      console.error("지역별 띠부씰 조회 실패:", error);
    } finally {
      setIsLoadingSeals(false);
    }
  };

  // API 데이터를 StickerList 형식으로 변환
  const convertToStickers = (seals) => {
    return seals.map((seal) => ({
      title: seal.spotName,
      collected: seal.collected,
      sealSpotId: seal.id,
      sealData: {
        number: seal.number,
        locationName: seal.locationName,
        rarity: seal.rarity,
        frontImageUrl: seal.frontImageUrl,
      },
    }));
  };

  if (loading) {
    return (
      <>
        <BackHeader title="행정구역 띠부실" />
        <div className={styles.main}>
          <div>로딩 중...</div>
        </div>
      </>
    );
  }

  const stickers = regionSealsData
    ? convertToStickers(regionSealsData.seals)
    : [];

  return (
    <>
      <BackHeader title="행정구역 띠부실" />
      <div className={styles.main}>
        <RegionSelector
          viewMode="admin"
          onRegionSelect={handleRegionSelect}
          showTitle={false}
          selectedLocations={selectedLocations}
        />
        {isLoadingSeals ? (
          <div>띠부씰 조회 중...</div>
        ) : regionSealsData ? (
          <StickerList stickers={stickers} />
        ) : (
          <div>지역을 선택해주세요.</div>
        )}
      </div>
    </>
  );
}
