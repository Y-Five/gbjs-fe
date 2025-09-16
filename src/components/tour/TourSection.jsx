import CourseCardSection from '../global/CourseCardSection';

export default function TourSection({
  tourData,
  title = '관광지 음성 가이드',
  description = '경주의 주요 관광지를 둘러보세요',
  onTourClick,
  className = '',
  loading = false,
  error = null,
  onRetry,
  isNoNearbyData = false,
}) {
  // tourData를 CourseCardSection에서 사용할 수 있는 형태로 변환
  const cards = tourData.map((tour) => ({
    name: tour.name,
    location: tour.location,
    image: tour.image,
    id: tour.id,
  }));

  // 근처 관광지가 없는 경우와 에러를 구분
  const displayError = isNoNearbyData
    ? '근처에 음성 가이드가 있는 관광지가 없습니다.'
    : error;
  const showRetryButton = !isNoNearbyData && onRetry; // 근처 관광지가 없는 경우에는 재시도 버튼 숨김

  return (
    <CourseCardSection
      title={title}
      sub={description}
      cards={cards}
      onCardClick={onTourClick}
      className={className}
      loading={loading}
      error={displayError}
      onRetry={showRetryButton ? onRetry : null}
    />
  );
}
