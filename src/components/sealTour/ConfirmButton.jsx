import { useNavigate } from "react-router-dom";
import styles from "./ConfirmButton.module.css";

export default function ConfirmButton({
  viewMode = "course",
  onGenerate,
  isGenerating = false,
}) {
  const navigate = useNavigate();

  const buttonText =
    viewMode === "region"
      ? isGenerating
        ? "띠부씰 조회 중..."
        : "띠부씰 조회"
      : isGenerating
      ? "코스 생성 중..."
      : "띠부씰 코스 확인";

  const handleClick = () => {
    if (onGenerate) {
      onGenerate();
    } else if (viewMode === "region") {
      navigate("/administrative");
    } else {
      navigate("/course");
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${isGenerating ? styles.loading : ""}`}
        onClick={handleClick}
        disabled={isGenerating}
      >
        {buttonText}
      </button>
    </div>
  );
}
