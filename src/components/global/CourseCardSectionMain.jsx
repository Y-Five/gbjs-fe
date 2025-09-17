import { useNavigate } from "react-router-dom";
import { savedCourseService } from "../../apis/savedCourse";
import styles from "./CourseCardSectionMain.module.css";

export default function CourseCardSectionMain({
  title,
  sub,
  tabs = [],
  cards = [],
  loading = false,
  error = null,
  activeTab = 0,
  onTabChange = null,
}) {
  const navigate = useNavigate();

  const handleCardClick = async (card) => {
    try {
      // courseId가 있으면 API로 상세 정보 조회
      if (card.id) {
        const response = await savedCourseService.getPublicCourseDetail(
          card.id
        );

        if (response.code === "SUCCESS") {
          // 코스 데이터를 localStorage에 저장
          localStorage.setItem("courseData", JSON.stringify(response.data));

          // CourseDetailPage로 이동 (저장하기 버튼 표시, 재생성 버튼 숨김)
          navigate("/course", {
            state: {
              headerTitle: "코스 상세보기",
              showSaveButton: true,
              showRegenerateButton: false,
            },
          });
        } else {
          alert("코스 정보를 불러올 수 없습니다.");
        }
      } else {
        // courseId가 없으면 기존 방식으로 처리
        localStorage.setItem("courseData", JSON.stringify(card));

        navigate("/course", {
          state: {
            headerTitle: "코스 상세보기",
            showSaveButton: true,
            showRegenerateButton: false,
          },
        });
      }
    } catch (error) {
      console.error("코스 상세 조회 실패:", error);
      alert("코스 정보를 불러올 수 없습니다.");
    }
  };
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>{sub}</p>

      {tabs.length > 0 && (
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${
                index === activeTab ? styles.active : ""
              }`}
              onClick={() => onTabChange && onTabChange(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className={styles.cardContainer}>
        {loading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : error ? (
          <div className={styles.error}>데이터를 불러올 수 없습니다.</div>
        ) : cards.length === 0 ? (
          <div className={styles.noData}>데이터가 없습니다.</div>
        ) : (
          cards.map((card, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleCardClick(card)}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className={styles.description}>
                <p className={styles.name}>{card.name}</p>
                <p className={styles.location}>{card.location}</p>
                {card.locationName && (
                  <p className={styles.locationName}>{card.locationName}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
