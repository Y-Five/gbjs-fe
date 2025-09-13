import PropTypes from "prop-types";
import styles from "./ProfileSection.module.css";

export default function ProfileSection({
  nickname = "나나난",
  profileImageUrl = "",
}) {
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileContainer}>
        <div className={styles.profileImageContainer}>
          <div className={styles.avatar}>
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필 이미지"
                className={styles.avatarImage}
              />
            ) : (
              <svg
                width="90"
                height="90"
                viewBox="0 0 100 100"
                fill="none"
                className={styles.userIcon}
              >
                <circle cx="50" cy="35" r="18" fill="#999" />
                <path
                  d="M20 85 C20 65, 35 55, 50 55 C65 55, 80 65, 80 85"
                  fill="#999"
                />
              </svg>
            )}
          </div>
          <button className={styles.cameraButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="13"
                r="4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.greeting}>오늘도 반갑습니다!</div>
      <div className={styles.userName}>
        {nickname}
        <span className={styles.honorific}>님</span>
      </div>
    </div>
  );
}

ProfileSection.propTypes = {
  nickname: PropTypes.string,
  profileImageUrl: PropTypes.string,
};
