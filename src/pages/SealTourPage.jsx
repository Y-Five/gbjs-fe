import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import ViewToggleTabs from '../components/sealTour/ViewToggleTabs';
import DescriptionBanner from '../components/sealTour/DescriptionBanner';
import DateSelector from '../components/sealTour/DateSelector';
import RegionSelector from '../components/sealTour/RegionSelector';
import ConfirmButton from '../components/sealTour/ConfirmButton';
import PopularSpotList from '../components/sealTour/PopularSpotList';
import { sealtourService } from '../apis/sealtour';

import styles from './SealTourPage.module.css';

export default function SealTourPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('course'); // "course" | "region"
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sortBy] = useState('NUMBER'); // "NUMBER" | "RARITY" | "LOCATION"
  const [isLoadingSeals, setIsLoadingSeals] = useState(false);

  // 코스 생성 함수
  const handleGenerateCourse = async () => {
    if (viewMode !== 'course') return;

    // 유효성 검사
    if (!startDate || !endDate) {
      alert('시작 날짜와 종료 날짜를 선택해주세요.');
      return;
    }

    if (selectedLocations.length === 0) {
      alert('최소 1개의 지역을 선택해주세요.');
      return;
    }

    // 날짜 차이 계산 (최대 5일)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays > 5) {
      alert('여행 기간은 최대 5일까지 가능합니다.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await sealtourService.generateCourse(
        startDate,
        endDate,
        selectedLocations
      );
      console.log('코스 생성 성공:', response);

      // 성공 시 코스 데이터와 원본 파라미터를 localStorage에 저장하고 CourseDetailPage로 이동
      if (response.code === 'SUCCESS') {
        localStorage.setItem('courseData', JSON.stringify(response.data));

        // 원본 파라미터 저장 (재생성용)
        const originalParams = {
          startDate,
          endDate,
          locations: selectedLocations,
        };
        localStorage.setItem('courseParams', JSON.stringify(originalParams));

        navigate('/course');
      } else {
        alert('코스 생성에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('코스 생성 실패:', error);
      alert('코스 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  // 행정구역 중심 모드에서 띠부씰 조회 함수
  const handleRegionSeals = async () => {
    if (viewMode !== 'region') return;

    if (selectedLocations.length === 0) {
      alert('최소 1개의 지역을 선택해주세요.');
      return;
    }

    setIsLoadingSeals(true);
    try {
      const response = await sealtourService.getSealsByLocation(
        sortBy,
        selectedLocations
      );
      console.log('지역별 띠부씰 조회 성공:', response);

      if (response.code === 'SUCCESS') {
        // 띠부씰 데이터를 localStorage에 저장하고 AdministrativePage로 이동
        localStorage.setItem(
          'regionSealsData',
          JSON.stringify({
            seals: response.data.seals || [],
            totalCount: response.data.totalCount || 0,
            collectedCount: response.data.collectedCount || 0,
            selectedLocations,
            sortBy,
          })
        );
        navigate('/administrative');
      } else {
        alert('띠부씰 조회에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('지역별 띠부씰 조회 실패:', error);
      alert('띠부씰 조회에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoadingSeals(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header title="경북씰 지도" isDark={true} />
      <main className={styles.main}>
        {/* <SearchBar /> */}
        <ViewToggleTabs viewMode={viewMode} onChange={setViewMode} />
        <DescriptionBanner viewMode={viewMode} />
        {viewMode === 'course' && (
          <DateSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        )}
        <RegionSelector
          viewMode={viewMode}
          selectedLocations={selectedLocations}
          onLocationChange={setSelectedLocations}
        />
        <ConfirmButton
          viewMode={viewMode}
          onGenerate={
            viewMode === 'course' ? handleGenerateCourse : handleRegionSeals
          }
          isGenerating={isGenerating || isLoadingSeals}
        />

        <PopularSpotList />
      </main>
    </div>
  );
}
