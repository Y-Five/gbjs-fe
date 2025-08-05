import { useState } from 'react';
import styles from './SettingsSection.module.css';

export default function SettingsSection() {
  const [ttsVoice, setTtsVoice] = useState('가이드 음성 스타일 선택');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);
  const [locationPermission, setLocationPermission] = useState(true);

  const voiceOptions = [
    '가이드 음성 스타일 선택',
    '여성 음성',
    '남성 음성',
    '아동 음성'
  ];

  const handleVoiceSelect = (option) => {
    setTtsVoice(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.settingsContainer}>
      {/* TTS 음성 설정 */}
      <div className={styles.settingSection}>
        <div className={styles.sectionTitle}>TTS 음성 설정</div>
        <div className={styles.settingItem}>
          <div className={styles.customDropdown}>
            <button 
              className={`${styles.dropdownButton} ${isDropdownOpen ? styles.open : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{ttsVoice}</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 12 8" 
                className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.rotated : ''}`}
                fill="none"
              >
                <path stroke="#6b7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 3L6 5L8 3" fill="none"/>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownList}>
                {voiceOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`${styles.dropdownOption} ${option === ttsVoice ? styles.selected : ''}`}
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
            className={`${styles.toggle} ${emailNotification ? styles.active : ''}`}
            onClick={() => setEmailNotification(!emailNotification)}
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
            className={`${styles.toggle} ${pushNotification ? styles.active : ''}`}
            onClick={() => setPushNotification(!pushNotification)}
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
            className={`${styles.toggle} ${locationPermission ? styles.active : ''}`}
            onClick={() => setLocationPermission(!locationPermission)}
          >
            <div className={styles.toggleHandle}></div>
          </button>
        </div>
      </div>
    </div>
  );
} 