import styles from './Icon.module.css';

const DropdownIcon = ({ className, size = '16', rotated = false, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${rotated ? styles.rotated : ''} ${className || ''}`}
      {...props}
    >
      <path
        d="M8 10.5L4.5 7H11.5L8 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DropdownIcon;