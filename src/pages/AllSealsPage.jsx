import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import { Dropdown } from "../components/global";
import { allSeals } from "../data/allSealsData";
import magpieImage from "../assets/images/magpie.png";
import styles from "./AllSealsPage.module.css";

const SORT_OPTIONS = [
  { key: "number", label: "번호순" },
  { key: "rarity", label: "희귀도순" },
  { key: "region", label: "지역순" },
  { key: "collection", label: "수집순" }
];

export default function AllSealsPage() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("number");
  
  // 임시 수집 데이터 (17개 수집, 1개 미수집)
  const [userSeals] = useState(() => {
    return allSeals.map((seal, index) => ({
      ...seal,
      collected: index < 17, // 처음 17개만 수집된 것으로 설정
      image: magpieImage,
      rarity: Math.floor(Math.random() * 5) + 1 // 임시 희귀도 데이터
    }));
  });
  
  const collectedCount = userSeals.filter(seal => seal.collected).length;
  const totalCount = userSeals.length;

  // 정렬 함수
  const getSortedSeals = () => {
    const sorted = [...userSeals];
    
    switch (sortOrder) {
      case "number":
        return sorted.sort((a, b) => a.id - b.id);
      case "rarity":
        return sorted.sort((a, b) => b.rarity - a.rarity);
      case "region":
        return sorted.sort((a, b) => a.region.localeCompare(b.region));
      case "collection":
        return sorted.sort((a, b) => {
          if (a.collected === b.collected) return a.id - b.id;
          return b.collected - a.collected;
        });
      default:
        return sorted;
    }
  };

  const sortedSeals = getSortedSeals();

  const handleBackClick = () => {
    navigate("/sealshop");
  };

  const getSealBorderColor = (index) => {
    if (index < 6) return "#2d8ae7"; // 파란색
    if (index < 12) return "#ff0f67"; // 핑크색
    return "#00d2bd"; // 청록색
  };

  const getSealBadgeColor = (index) => {
    if (index < 6) return "#2d8ae7"; // 파란색
    if (index < 12) return "#ff0f67"; // 핑크색
    return "#00d2bd"; // 청록색
  };

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
              <span className={styles.remainingNumber}>{totalCount - collectedCount}개</span> 남음
            </span>
          </div>

          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(collectedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* 정렬 드롭다운 */}
        <div className={styles.sortSection}>
          <Dropdown
            options={SORT_OPTIONS}
            value={sortOrder}
            onChange={(option) => setSortOrder(option.key)}
            ariaLabel="정렬 방식"
          />
        </div>

        {/* 띠부씰 그리드 */}
        <div className={styles.sealsGrid}>
          {sortedSeals.map((seal, index) => (
            <div 
              key={seal.id} 
              className={`${styles.sealCard} ${seal.collected ? styles.collected : styles.uncollected}`}
              style={{ 
                borderColor: seal.collected ? getSealBorderColor(index) : "#e8e8e8"
              }}
            >
              <div className={styles.sealHeader}>
                <div 
                  className={styles.sealBadge}
                  style={{ 
                    backgroundColor: seal.collected ? getSealBadgeColor(index) : "#e8e8e8"
                  }}
                >
                  <span className={styles.badgeNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={`${styles.sealName} ${seal.name.length > 8 ? styles.longName : ''}`}>{seal.name}</div>
              </div>
              <div className={styles.sealImageWrapper}>
                <img 
                  src={seal.image} 
                  alt={seal.name} 
                  className={styles.sealImage}
                  style={{
                    filter: seal.collected ? "none" : "grayscale(100%)"
                  }}
                />
              </div>
              <div className={styles.sealLocation}>{seal.region}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}