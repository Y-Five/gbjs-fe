import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const TourPage = lazy(() => import('../pages/TourPage'));
const SealTourPage = lazy(() => import('../pages/SealTourPage'));
const SealShopPage = lazy(() => import('../pages/SealShopPage'));
const SealExchangePage = lazy(() => import('../pages/SealExchangePage'));
const AllSealsPage = lazy(() => import('../pages/AllSealsPage'));
const CourseDetailPage = lazy(() => import('../pages/CourseDetailPage'));
const AdministrativePage = lazy(() => import('../pages/AdministrativePage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const PlaceDetailPage = lazy(() => import('../pages/PlaceDetailPage'));
const FestivalDetailPage = lazy(() => import('../pages/FestivalDetailPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const MyPage = lazy(() => import('../pages/MyPage'));
const AccountEditPage = lazy(() => import('../pages/AccountEditPage'));
const AccountWithdrawalPage = lazy(() =>
  import('../pages/AccountWithdrawalPage')
);
const AccountWithdrawalCompletePage = lazy(() =>
  import('../pages/AccountWithdrawalCompletePage')
);
const SavedCoursePage = lazy(() => import('../pages/SavedCoursePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const SealAcquisitionPage = lazy(() => import('../pages/SealAcquisitionPage'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '16px',
      color: '#666',
    }}
  >
    페이지를 불러오는 중...
  </div>
);

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/sealtour" element={<SealTourPage />} />
          <Route path="/sealshop" element={<SealShopPage />} />
          <Route
            path="/sealshop/exchange/:productId"
            element={<SealExchangePage />}
          />
          <Route path="/allseals" element={<AllSealsPage />} />
          <Route path="/course" element={<CourseDetailPage />} />
          <Route path="/course-detail" element={<CourseDetailPage />} />
          <Route path="/administrative" element={<AdministrativePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/place/:contentId" element={<PlaceDetailPage />} />
          <Route path="/festival/:contentid" element={<FestivalDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/account-edit" element={<AccountEditPage />} />
          <Route
            path="/account-withdrawal"
            element={<AccountWithdrawalPage />}
          />
          <Route
            path="/account-withdrawal-complete"
            element={<AccountWithdrawalCompletePage />}
          />
          <Route path="/saved-course" element={<SavedCoursePage />} />
          <Route path="/getseals" element={<SealAcquisitionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
