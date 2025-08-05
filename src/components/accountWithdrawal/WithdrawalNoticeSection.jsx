import styles from './WithdrawalNoticeSection.module.css';

export default function WithdrawalNoticeSection() {
  const notices = [
    '탈퇴 후 삭제되는 모든 정보는 복구 불가능합니다.',
    '저장한 코스, 모든 데이터의 복구 삭제 없습니다.',
    '탈퇴 처리 안내된 회원 복구 업데이트 진행합니다.'
  ];

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>탈퇴 전 유의사항</h2>
      <ul className={styles.noticeList}>
        {notices.map((notice, index) => (
          <li key={index} className={styles.noticeItem}>
            {notice}
          </li>
        ))}
      </ul>
    </div>
  );
} 