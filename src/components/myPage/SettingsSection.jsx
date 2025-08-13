import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  toggleEmailMarketingConsent,
  toggleLocationConsent,
  togglePushNotificationConsent,
  updateTtsSetting,
} from "../../apis/myPageApi";
import styles from "./SettingsSection.module.css";

export default function SettingsSection({
  ttsSetting,
  emailMarketingConsent,
  pushNotificationConsent,
  locationConsent,
}) {
  const [ttsVoice, setTtsVoice] = useState("가이드 음성 스타일 선택");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);
  const [locationPermission, setLocationPermission] = useState(true);

  useEffect(() => {
    if (typeof emailMarketingConsent === "boolean")
      setEmailNotification(emailMarketingConsent);
    if (typeof pushNotificationConsent === "boolean")
      setPushNotification(pushNotificationConsent);
    if (typeof locationConsent === "boolean")
      setLocationPermission(locationConsent);

    if (ttsSetting) {
      const labelMapFromCode = {
        FEMALE_A: "여성 A",
        FEMALE_B: "여성 B",
        MALE_C: "남성 C",
        MALE_D: "남성 D",
      };
      setTtsVoice(labelMapFromCode[ttsSetting] || "가이드 음성 스타일 선택");
    }
  }, [
    ttsSetting,
    emailMarketingConsent,
    pushNotificationConsent,
    locationConsent,
  ]);

  const voiceOptions = ["여성 A", "여성 B", "남성 C", "남성 D"];

  const codeMapFromLabel = {
    "여성 A": "FEMALE_A",
    "여성 B": "FEMALE_B",
    "남성 C": "MALE_C",
    "남성 D": "MALE_D",
  };

  const handleVoiceSelect = async (option) => {
    const prev = ttsVoice;
    setTtsVoice(option);
    setIsDropdownOpen(false);
    try {
      const code = codeMapFromLabel[option];
      if (code) {
        await updateTtsSetting(code);
      }
    } catch (e) {
      // 실패 시 원복
      setTtsVoice(prev);
      console.error(e);
    }
  };

  const handleToggleEmail = async () => {
    const next = !emailNotification;
    setEmailNotification(next);
    try {
      await toggleEmailMarketingConsent();
    } catch (e) {
      setEmailNotification(!next);
      console.error(e);
    }
  };

  const handleTogglePush = async () => {
    const next = !pushNotification;
    setPushNotification(next);
    try {
      await togglePushNotificationConsent();
    } catch (e) {
      setPushNotification(!next);
      console.error(e);
    }
  };

  const handleToggleLocation = async () => {
    const next = !locationPermission;
    setLocationPermission(next);
    try {
      await toggleLocationConsent();
    } catch (e) {
      setLocationPermission(!next);
      console.error(e);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      {/* TTS 음성 설정 */}
      <div className={styles.settingSection}>
        <div className={styles.sectionTitle}>TTS 음성 설정</div>
        <div className={styles.settingItem}>
          <div className={styles.customDropdown}>
            <button
              className={`${styles.dropdownButton} ${
                isDropdownOpen ? styles.open : ""
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{ttsVoice}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 12 8"
                className={`${styles.dropdownArrow} ${
                  isDropdownOpen ? styles.rotated : ""
                }`}
                fill="none"
              >
                <path
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 3L6 5L8 3"
                  fill="none"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownList}>
                {voiceOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`${styles.dropdownOption} ${
                      option === ttsVoice ? styles.selected : ""
                    }`}
                    onClick={() => handleVoiceSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 알림 설정 */}
      <div className={styles.settingSection}>
        <div className={styles.sectionTitle}>알림 설정</div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>이메일 수신</div>
            <div className={styles.settingDesc}>프로모션 및 이벤트 정보</div>
          </div>
          <button
            className={`${styles.toggle} ${
              emailNotification ? styles.active : ""
            }`}
            onClick={handleToggleEmail}
          >
            <div className={styles.toggleHandle}></div>
          </button>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>앱 푸시</div>
            <div className={styles.settingDesc}>중요 알림</div>
          </div>
          <button
            className={`${styles.toggle} ${
              pushNotification ? styles.active : ""
            }`}
            onClick={handleTogglePush}
          >
            <div className={styles.toggleHandle}></div>
          </button>
        </div>
      </div>

      {/* 개인정보 설정 */}
      <div className={styles.settingSection}>
        <div className={styles.sectionTitle}>개인정보 설정</div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>위치 정보 수집 동의</div>
            <div className={styles.settingDesc}>주변 가이드 서비스 제공</div>
          </div>
          <button
            className={`${styles.toggle} ${
              locationPermission ? styles.active : ""
            }`}
            onClick={handleToggleLocation}
          >
            <div className={styles.toggleHandle}></div>
          </button>
        </div>
      </div>
    </div>
  );
}

SettingsSection.propTypes = {
  ttsSetting: PropTypes.string,
  emailMarketingConsent: PropTypes.bool,
  pushNotificationConsent: PropTypes.bool,
  locationConsent: PropTypes.bool,
};
