import CourseCardSection from "../global/CourseCardSection";
import mountainImg from "../../assets/images/mountain.jpg";
import raceImg from "../../assets/images/race.jpg";

export default function TravelCourses() {
  return (
    <CourseCardSection
      title="여행코스"
      sub="원하는 코스를 골라 아름다운 경북을 여행하세요."
      tabs={["테마별 코스", "행사별 코스"]}
      cards={[
        {
          image: mountainImg,
          name: "아름다운 경북의 산을 보기 위한 코스",
          location: "안동시",
        },
        {
          image: raceImg,
          name: "다채로운 무형유산을 체험하기 위한 코스",
          location: "영양군",
        },
      ]}
    />
  );
}
