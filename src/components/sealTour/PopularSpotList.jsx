import CourseCardSection from "../global/CourseCardSection"; // 경로는 실제 위치에 맞게 조정
import spotImg from "../../assets/images/mountain.jpg";

const popularCards = [
  {
    image: spotImg,
    name: "첨성대",
    location: "# 아름다운 야경\n# 유명 명소",
  },
  {
    image: spotImg,
    name: "첨성대",
    location: "# 아름다운 야경\n# 유명 명소",
  },
];

export default function PopularSpotList() {
  return (
    <CourseCardSection
      title="인기 띠부씰 관광지"
      sub="요즘 인기 있는 관광지에서 띠부씰을 모아보세요!"
      cards={popularCards}
    />
  );
}
