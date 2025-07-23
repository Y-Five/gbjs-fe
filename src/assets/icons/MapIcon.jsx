import styles from "./Icon.module.css";

const MapIcon = ({ className, size = "18", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className || ""}`}
      {...props}
    >
      <path
        d="M6.75 2.25L2.25 4.5V15L6.75 12.75V2.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 5.25L6.75 2.25V12.75L11.25 15.75V5.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 5.25L15.75 3V13.5L11.25 15.75V5.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MapIcon;