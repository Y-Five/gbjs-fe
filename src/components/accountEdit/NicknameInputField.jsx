import { useState } from "react";
import PropTypes from "prop-types";
import { checkNicknameAvailability } from "../../apis/myPageApi";
import styles from "./NicknameInputField.module.css";

export default function NicknameInputField({
  value,
  onChange,
  onValidationChange,
}) {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // 'available', 'duplicate', null

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setCheckResult(null);
    onValidationChange(false);
  };

  const handleDuplicateCheck = async () => {
    if (!value.trim()) return;
    setIsChecking(true);
    try {
      const result = await checkNicknameAvailability(value.trim());
      const isDuplicate = Boolean(result);
      if (isDuplicate) {
        setCheckResult("duplicate");
        onValidationChange(false);
      } else {
        setCheckResult("available");
        onValidationChange(true);
      }
    } catch (e) {
      setCheckResult("duplicate");
      onValidationChange(false);
      console.error(e);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>변경 닉네임</label>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.nicknameInput}
            placeholder="변경 닉네임을 입력하세요."
            value={value}
            onChange={handleInputChange}
            maxLength={20}
          />
          <button
            className={styles.duplicateButton}
            onClick={handleDuplicateCheck}
            disabled={!value.trim() || isChecking}
          >
            {isChecking ? "확인중..." : "중복확인"}
          </button>
        </div>
      </div>
      {checkResult && (
        <div
          className={`${styles.checkMessage} ${
            checkResult === "duplicate"
              ? styles.errorMessage
              : styles.successMessage
          }`}
        >
          {checkResult === "available"
            ? "사용 가능한 닉네임입니다."
            : "이미 존재하는 닉네임입니다."}
        </div>
      )}
    </div>
  );
}

NicknameInputField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
};
