import styles from '../../pages/AllSealsPage.module.css';

export default function EmptyState({ seals, showUserSeals, isLoggedIn }) {
  if (seals.length > 0) return null;

  return (
    <div className={styles.emptyState}>
      <p>
        {showUserSeals
          ? isLoggedIn
            ? '모아보세요~'
            : '로그인이 필요한 서비스입니다.'
          : '띠부씰 정보가 없습니다.'}
      </p>
    </div>
  );
}
