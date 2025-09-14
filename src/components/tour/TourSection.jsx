import CourseCardSection from '../global/CourseCardSection';

export default function TourSection({
  tourData,
  title = '관광지 음성 가이드',
  description = '경주의 주요 관광지를 둘러보세요',
  onTourClick,
  className = '',
}) {
  // tourData를 CourseCardSection에서 사용할 수 있는 형태로 변환
  const cards = tourData.map((tour) => ({
    name: tour.name,
    location: tour.location,
    image: tour.image,
    id: tour.id,
  }));

  return (
    <CourseCardSection
      title={title}
      sub={description}
      cards={cards}
      onCardClick={onTourClick}
      className={className}
    />
  );
}
