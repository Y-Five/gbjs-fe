import styles from '../../pages/AllSealsPage.module.css';

export default function EmptyState({ seals, showUserSeals, isLoggedIn }) {
  // 로딩 중이거나 데이터가 있으면 아무것도 표시하지 않음
  if (seals.length > 0) return null;

  // 수집한 띠부씰 보기에서만 메시지 표시
  if (showUserSeals) {
    return (
      <div className={styles.emptyState}>
        <p>{isLoggedIn ? '모아보세요~' : '로그인이 필요한 서비스입니다.'}</p>
      </div>
    );
  }

  // 전체 띠부씰 보기에서는 아무것도 표시하지 않음
  return null;
}
