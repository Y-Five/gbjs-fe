import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainPage from "../pages/MainPage";
// import CourseDetailPage from "../pages/CourseDetailPage";
// import RegionSearchPage from "../pages/RegionSearchPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<MainPage />} />
        <Route path="/course" element={<CourseSearchPage />} />
        <Route path="/courses/:type/:id" element={<CourseDetailPage />} /> */}
      </Routes>
    </Router>
  );
}
