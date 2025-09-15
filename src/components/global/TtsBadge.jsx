import styles from './TtsBadge.module.css';

export default function TtsBadge({ className = '', children = 'TTS' }) {
  return <span className={`${styles.ttsBadge} ${className}`}>{children}</span>;
}
