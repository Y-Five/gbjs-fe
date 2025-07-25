import { useNavigate } from "react-router-dom";
import styles from "./ConfirmButton.module.css";

export default function ConfirmButton({ viewMode = "course" }) {
  const navigate = useNavigate();

  const buttonText =
    viewMode === "region" ? "선택 행정구역 띠부씰 확인" : "띠부씰 코스 확인";

  const handleClick = () => {
    if (viewMode === "region") {
      navigate("/administrative");
    } else {
      navigate("/course");
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}
