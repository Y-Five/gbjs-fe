import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./StickerList.module.css";
import { sealtourService } from "../../apis/sealtour";
import SealModal from "./SealModal";

export default function StickerList({ selectedDay, courseData, stickers }) {
  const [sealDetails, setSealDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSeal, setSelectedSeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 선택된 일차에 해당하는 띠부씰만 필터링 (코스 모드용)
  const getCurrentDayStickers = useCallback(() => {
    if (!courseData?.dailyCourses || !selectedDay) return [];

    const currentDayCourse = courseData.dailyCourses.find(
      (course) => course.dayNumber === selectedDay
    );

    if (!currentDayCourse) return [];

    // 현재 일차의 isSealSpot이 true인 스팟들만 필터링
    return currentDayCourse.spots
      .filter((spot) => spot.isSealSpot)
      .map((spot) => ({
        title: spot.name,
        collected: false, // 기본값은 수집 안함
        sealSpotId: spot.sealSpotId,
      }));
  }, [courseData, selectedDay]);

  // 띠부씰 상세 정보 가져오기
  useEffect(() => {
    const fetchSealDetails = async () => {
      // stickers prop이 있으면 그것을 사용 (AdministrativePage용)
      const sourceStickers = stickers || getCurrentDayStickers();

      if (sourceStickers.length === 0) {
        setSealDetails([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // sealSpotId가 있는 띠부씰들만 필터링
        const sealSpots = sourceStickers.filter(
          (sticker) => sticker.sealSpotId
        );

        if (sealSpots.length === 0) {
          setSealDetails([]);
          return;
        }

        // 각 띠부씰의 상세 정보를 병렬로 가져오기
        const promises = sealSpots.map(async (sticker) => {
          try {
            const response = await sealtourService.getSealDetail(
              sticker.sealSpotId
            );
            return {
              ...sticker,
              sealData: response.data,
            };
          } catch (err) {
            console.error(`띠부씰 ${sticker.sealSpotId} 조회 실패:`, err);
            return {
              ...sticker,
              sealData: null,
            };
          }
        });

        const results = await Promise.all(promises);
        setSealDetails(results);
      } catch (err) {
        console.error("띠부씰 상세 정보 조회 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSealDetails();
  }, [selectedDay, courseData, getCurrentDayStickers, stickers]);

  const handleSealClick = (seal) => {
    setSelectedSeal(seal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeal(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>수집 가능한 띠부씰 리스트</p>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>수집 가능한 띠부씰 리스트</p>
        <div className={styles.error}>띠부씰 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>수집 가능한 띠부씰 리스트</p>
        <div className={styles.grid}>
          {sealDetails.map((sticker, i) => (
            <div
              key={i}
              className={styles.card}
              onClick={() => handleSealClick(sticker)}
            >
              <img
                src={sticker.sealData?.frontImageUrl}
                className={styles.img}
                alt={sticker.title}
              />
            </div>
          ))}
        </div>
      </div>
      <SealModal
        seal={selectedSeal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

StickerList.propTypes = {
  selectedDay: PropTypes.number,
  courseData: PropTypes.object,
  stickers: PropTypes.array,
};
