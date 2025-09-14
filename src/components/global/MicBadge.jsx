import styles from './MicBadge.module.css';

export default function MicBadge({ className = '' }) {
  return (
    <div className={`${styles.micBadge} ${className}`}>
      <svg
        width="9"
        height="13"
        viewBox="0 0 9 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="음성 가이드 사용 가능"
      >
        <path
          d="M4.5 0C3.11929 0 2 1.11929 2 2.5V6.5C2 7.88071 3.11929 9 4.5 9C5.88071 9 7 7.88071 7 6.5V2.5C7 1.11929 5.88071 0 4.5 0Z"
          fill="white"
        />
        <path
          d="M1 6.5C1 6.5 1 8.5 4.5 8.5C8 8.5 8 6.5 8 6.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4.5 8.5V11.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2.5 11.5H6.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
