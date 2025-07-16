import Header from "../components/header/Header";
import MainBanner from "../components/main/MainBanner";
import SearchWeather from "../components/main/SearchWeather";
import TravelCourses from "../components/main/TravelCourses";
import EventMap from "../components/main/EventMap";
import TraditionalProducts from "../components/main/TraditionalProducts";

export default function MainPage() {
  return (
    <div>
      <Header />
      <MainBanner />

      <section id="weatherSection">
        <SearchWeather />
      </section>

      <section id="courseSection">
        <TravelCourses />
      </section>

     <section id="eventSection">
        <EventMap />
      </section>

      <section id="productSection">
        <TraditionalProducts />
      </section>
    </div>
  );
}
