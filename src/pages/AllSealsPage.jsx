import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/header/BackHeader';
import { Dropdown } from '../components/global';
import styles from './AllSealsPage.module.css';
import { getAllSeals } from '../apis/sealApi';
import magpieImage from '../assets/images/magpie.png';

const SORT_OPTIONS = [
  { key: 'NUMBER', label: '번호순' },
  { key: 'RARITY', label: '희귀도순' },
  { key: 'LOCATION', label: '지역순' },
  { key: 'COLLECTED', label: '수집순' },
];

const ANIMATION_DELAYS = {
  FLIP: 300,
  DATA_UPDATE: 100,
  FLIP_BACK: 100,
  COMPLETE: 300,
};

export default function AllSealsPage() {
  const navigate = useNavigate();
  const [seals, setSeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('NUMBER');
  const [showUserSeals, setShowUserSeals] = useState(false);

  useEffect(() => {
    fetchSeals();
  }, [sortBy]);

  const fetchSeals = async () => {
    try {
      if (seals.length > 0) {
        // 정렬 애니메이션 시작
        setIsSorting(true);

        // 1단계: 카드 뒤집기
        setTimeout(() => {
          setIsFlipped(true);

          // 2단계: 데이터 업데이트
          setTimeout(async () => {
            const response = await getAllSeals(sortBy);
            const sealsData = response?.data?.seals || response?.seals || [];
            setSeals(Array.isArray(sealsData) ? sealsData : []);

            // 3단계: 카드 다시 뒤집기
            setTimeout(() => {
              setIsFlipped(false);

              // 4단계: 애니메이션 완료
              setTimeout(() => {
                setIsSorting(false);
              }, ANIMATION_DELAYS.COMPLETE);
            }, ANIMATION_DELAYS.FLIP_BACK);
          }, ANIMATION_DELAYS.DATA_UPDATE);
        }, ANIMATION_DELAYS.FLIP);
      } else {
        // 초기 로딩
        setLoading(true);
        const response = await getAllSeals(sortBy);
        const sealsData = response?.data?.seals || response?.seals || [];
        setSeals(Array.isArray(sealsData) ? sealsData : []);
        setLoading(false);
      }
    } catch (error) {
      console.error('띠부씰 조회 실패:', error);
      setError('띠부씰 정보를 불러오는 중 오류가 발생했습니다.');
      setSeals([]);
      setLoading(false);
      setIsSorting(false);
      setIsFlipped(false);
    }
  };

  const handleBackClick = () => navigate('/sealshop');
  const handleSortChange = (option) => setSortBy(option.key);

  // 현재 표시할 띠부씰 데이터
  const currentSeals = showUserSeals
    ? seals.filter((seal) => seal.collected)
    : seals;

  const totalCount = seals.length;
  const collectedCount = seals.filter((seal) => seal.collected).length;

  // 색상 유틸리티 함수들
  const getRarityColor = (rarity) => {
    const colors = {
      BLUE: 'var(--rarity-blue)',
      GREEN: 'var(--rarity-green)',
      RED: 'var(--rarity-red)',
    };
    return colors[rarity] || colors.BLUE;
  };

  const getSealBorderColor = (seal) => {
    return seal.collected ? getRarityColor(seal.rarity) : '#e8e8e8';
  };

  const getSealBadgeColor = (seal) => {
    return seal.collected ? getRarityColor(seal.rarity) : '#e8e8e8';
  };

  const getSealImage = (seal) => {
    return seal.frontImageUrl?.trim() || magpieImage;
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className={styles.page}>
        <BackHeader title="전체 띠부씰 보기" />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>띠부씰 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={styles.page}>
        <BackHeader title="전체 띠부씰 보기" />
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <button onClick={handleBackClick} className={styles.backButton}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <BackHeader title="전체 띠부씰 보기" />

      <main className={styles.main}>
        {/* 수집 현황 카드 */}
        <div className={styles.collectionCard}>
          <h3 className={styles.collectionTitle}>띠부씰 수집 현황</h3>
          <div className={styles.collectionCount}>
            <span className={styles.countNumber}>{collectedCount}</span>
            <span className={styles.countSeparator}>/</span>
            <span className={styles.countTotal}>{totalCount}</span>
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>띠부씰 수집 완료까지</span>
            <span className={styles.progressRemaining}>
              <span className={styles.remainingNumber}>
                {totalCount - collectedCount}개
              </span>{' '}
              남음
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(collectedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* 뷰 토글 버튼 */}
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${
              !showUserSeals ? styles.active : ''
            }`}
            onClick={() => setShowUserSeals(false)}
          >
            전체 띠부씰
          </button>
          <button
            className={`${styles.toggleButton} ${
              showUserSeals ? styles.active : ''
            }`}
            onClick={() => setShowUserSeals(true)}
          >
            내 수집품
          </button>
        </div>

        {/* 정렬 드롭다운 */}
        <div className={styles.sortSection}>
          <Dropdown
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={handleSortChange}
            ariaLabel="정렬 방식"
          />
        </div>

        {/* 띠부씰 그리드 */}
        <div className={styles.gridContainer}>
          <div
            className={`${styles.sealsGrid} ${
              isSorting ? styles.sorting : ''
            } ${currentSeals.length > 9 ? styles.expandedGrid : ''}`}
          >
            {currentSeals.map((seal) => (
              <div
                key={seal.id}
                className={`${styles.sealCard} ${
                  seal.collected ? styles.collected : styles.uncollected
                } ${isSorting ? styles.sorting : ''} ${
                  isFlipped ? styles.flipped : ''
                }`}
                style={{ borderColor: getSealBorderColor(seal) }}
              >
                <div className={styles.sealHeader}>
                  <div
                    className={styles.sealBadge}
                    style={{ backgroundColor: getSealBadgeColor(seal) }}
                  >
                    <span className={styles.badgeNumber}>
                      {String(seal.number).padStart(2, '0')}
                    </span>
                  </div>
                  <div
                    className={`${styles.sealName} ${
                      seal.spotName.length > 8 ? styles.longName : ''
                    }`}
                  >
                    {seal.spotName}
                  </div>
                </div>
                <div className={styles.sealImageWrapper}>
                  <img
                    src={getSealImage(seal)}
                    alt={seal.spotName}
                    className={styles.sealImage}
                    style={{
                      filter: !seal.collected ? 'grayscale(100%)' : 'none',
                    }}
                    onError={(e) => {
                      e.target.src = magpieImage;
                    }}
                  />
                </div>
                <div className={styles.sealLocation}>{seal.locationName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 빈 상태 */}
        {currentSeals.length === 0 && (
          <div className={styles.emptyState}>
            <p>
              {showUserSeals
                ? '수집한 띠부씰이 없습니다.'
                : '띠부씰 정보가 없습니다.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
