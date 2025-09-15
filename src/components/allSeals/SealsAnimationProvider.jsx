import { useState } from 'react';

const ANIMATION_DELAYS = {
  FLIP: 300,
  DATA_UPDATE: 100,
  FLIP_BACK: 100,
  COMPLETE: 300,
};

export default function SealsAnimationProvider({ children }) {
  const [isSorting, setIsSorting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const startSortingAnimation = async (dataUpdateCallback) => {
    setIsSorting(true);

    // 1단계: 카드 뒤집기
    setTimeout(() => {
      setIsFlipped(true);

      // 2단계: 데이터 업데이트 (비동기 처리)
      setTimeout(async () => {
        try {
          await dataUpdateCallback();
        } catch (error) {
          console.error('정렬 데이터 업데이트 실패:', error);
        }

        // 3단계: 카드 다시 뒤집기
        setTimeout(() => {
          setIsFlipped(false);

          // 4단계: 애니메이션 완료
          setTimeout(() => {
            setIsSorting(false);
          }, ANIMATION_DELAYS.COMPLETE);
        }, ANIMATION_DELAYS.FLIP_BACK);
      }, ANIMATION_DELAYS.DATA_UPDATE);
    }, ANIMATION_DELAYS.FLIP);
  };

  const resetAnimation = () => {
    setIsSorting(false);
    setIsFlipped(false);
  };

  return children({
    isSorting,
    isFlipped,
    startSortingAnimation,
    resetAnimation,
  });
}
