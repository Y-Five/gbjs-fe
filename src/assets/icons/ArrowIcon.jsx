import styles from './Icon.module.css';

const ArrowIcon = ({ className, size = '17.47', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className || ''}`}
      {...props}
    >
      <path
        d="M11.5 14.5L5.5 8.5L11.5 2.5"
        stroke="currentColor"
        strokeWidth="2.18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;