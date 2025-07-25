import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TourPage from "../pages/TourPage";
<<<<<<< HEAD
import SealTourPage from "../pages/SealTourPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import AdministrativePage from "../pages/AdministrativePage";
=======
import SearchPage from "../pages/SearchPage";
import PlaceDetailPage from "../pages/PlaceDetailPage";
import ChatPage from "../pages/ChatPage";
// import CourseDetailPage from "../pages/CourseDetailPage";
// import RegionSearchPage from "../pages/RegionSearchPage";
>>>>>>> develop

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tour" element={<TourPage />} />
<<<<<<< HEAD
        <Route path="/sealtour" element={<SealTourPage />} />
        <Route path="/course" element={<CourseDetailPage />} />
        <Route path="/administrative" element={<AdministrativePage />} />
=======
        <Route path="/search" element={<SearchPage />} />
        <Route path="/place/:contentId" element={<PlaceDetailPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* <Route path="/course" element={<CourseSearchPage />} />
        <Route path="/courses/:type/:id" element={<CourseDetailPage />} /> */}
>>>>>>> develop
      </Routes>
    </Router>
  );
}
