import styles from './Icon.module.css';

const ClockIcon = ({ className, size = '14', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className || ''}`}
      {...props}
    >
      <path
        d="M7 12.8333C10.2217 12.8333 12.8333 10.2217 12.8333 7C12.8333 3.77834 10.2217 1.16667 7 1.16667C3.77834 1.16667 1.16667 3.77834 1.16667 7C1.16667 10.2217 3.77834 12.8333 7 12.8333Z"
        fill="currentColor"
      />
      <path
        d="M7 3.5V7L9.33333 8.16667"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;