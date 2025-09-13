import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import {
  WithdrawalNoticeSection,
  ConfirmationInputSection,
  WithdrawalSubmitSection,
} from "../components/accountWithdrawal";
import styles from "./AccountWithdrawalPage.module.css";
import { deleteUser } from "../apis/myPageApi";

export default function AccountWithdrawalPage() {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!isConfirmed) return;

    // 실제로는 API 호출하여 계정 탈퇴 처리
    const confirmWithdrawal = window.confirm(
      "정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );

    if (confirmWithdrawal) {
      try {
        await deleteUser();
        // 탈퇴 처리 후 완료 페이지로 이동
        navigate("/account-withdrawal-complete");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={styles.withdrawalContainer}>
      <BackHeader title="계정 탈퇴" />

      <div className={styles.content}>
        <WithdrawalNoticeSection />
        <ConfirmationInputSection onValidationChange={setIsConfirmed} />
      </div>

      <WithdrawalSubmitSection
        onSubmit={handleSubmit}
        disabled={!isConfirmed}
      />
    </div>
  );
}
