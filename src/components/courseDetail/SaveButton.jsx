import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SaveButton.module.css";
import { sealtourService } from "../../apis/sealtour";

export default function SaveButton({ courseData, onSaveSuccess }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!courseData) {
      alert("저장할 코스 데이터가 없습니다.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await sealtourService.saveCourse(courseData);

      if (response.code === "SUCCESS") {
        alert("코스가 성공적으로 저장되었습니다!");
        if (onSaveSuccess) {
          onSaveSuccess(response.data);
        }
        // 저장 성공 시 저장된 코스 페이지로 이동
        navigate("/saved-course");
      } else {
        alert("코스 저장에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("코스 저장 실패:", error);
      alert("코스 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button className={styles.button} onClick={handleSave} disabled={isSaving}>
      {isSaving ? "저장 중..." : "저장하기"}
    </button>
  );
}

SaveButton.propTypes = {
  courseData: PropTypes.object,
  onSaveSuccess: PropTypes.func,
};
