import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SavedCourseList.module.css';

export default function SavedCourseList() {
  const [sortOrder, setSortOrder] = useState('latest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const savedCourses = [];
  // const savedCourses = [
  //   {
  //     id: 1,
  //     stampCount: 3,
  //     totalStamps: 5,
  //     title: '6월 24일 안동,의성,영천 코스',
  //     date: '2024-06-24'
  //   },
  //   {
  //     id: 2,
  //     stampCount: 0,
  //     totalStamps: 5,
  //     title: '6월 24일 안동,의성,영천 코스',
  //     date: '2024-06-24'
  //   },
  //   {
  //     id: 3,
  //     stampCount: 1,
  //     totalStamps: 5,
  //     title: '6월 24일 안동,의성,영천 코스',
  //     date: '2024-06-24'
  //   }
  // ];

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'name', label: '이름순' }
  ];

  const handleSortChange = (value) => {
    setSortOrder(value);
    setIsDropdownOpen(false);
  };

  const handleCourseClick = (courseId) => {
    navigate('/course-detail', { 
      state: { 
        headerTitle: '코스 상세보기', 
        showSaveButton: false,
        courseId: courseId 
      } 
    });
  };

  return (
    <div className={styles.listSection}>
      <div className={styles.listHeader}>
        <h3 className={styles.listTitle}>
          총 <span className={styles.countNumber}>{savedCourses.length}</span>건
        </h3>
        <div className={styles.sortContainer}>
          <button 
            className={styles.sortButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find(option => option.value === sortOrder)?.label}
            <svg 
              width="19" 
              height="19" 
              viewBox="0 0 12 8" 
              className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.rotated : ''}`}
            >
              <path stroke="#A8A8A8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3L6 6L9 3" fill="none"/>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className={styles.sortDropdown}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.sortOption} ${sortOrder === option.value ? styles.active : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.courseList}>
        {savedCourses.length > 0 ? (
          savedCourses.map((course) => (
            <div 
              key={course.id} 
              className={styles.courseItem}
              onClick={() => handleCourseClick(course.id)}
            >
              <div className={styles.courseInfo}>
                <div className={styles.stampInfo}>
                  <span className={styles.stampLabel}>수집한 스탬프:</span>
                  <span className={styles.stampCount}>{course.stampCount}/{course.totalStamps}</span>
                </div>
                <div className={styles.courseTitleContainer}>
                  <h4 className={styles.courseTitle}>{course.title}</h4>
                  <svg width="8" height="12" viewBox="0 0 8 12" className={styles.arrowIcon}>
                  <path d="M1.5 1L6.5 6L1.5 11" stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <p className={styles.emptyTitle}>저장된 코스가 없습니다.</p>
              <p className={styles.emptyDescription}>스탬프 지도에서 나만의 코스를 만들어보세요.</p>
              <button 
                className={styles.emptyButton}
                onClick={() => navigate('/sealtour')}
              >
                스탬프 지도로 이동하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}