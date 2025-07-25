import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TourPage from "../pages/TourPage";
import SealTourPage from "../pages/SealTourPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import AdministrativePage from "../pages/AdministrativePage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tour" element={<TourPage />} />
        <Route path="/sealtour" element={<SealTourPage />} />
        <Route path="/course" element={<CourseDetailPage />} />
        <Route path="/administrative" element={<AdministrativePage />} />
      </Routes>
    </Router>
  );
}
