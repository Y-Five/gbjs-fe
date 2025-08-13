import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import { NicknameEditSection, SubmitSection } from "../components/accountEdit";
import styles from "./AccountEditPage.module.css";
import { getNickname, updateNickname } from "../apis/myPageApi";

export default function AccountEditPage() {
  const navigate = useNavigate();
  const [currentNickname, setCurrentNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const nickname = await getNickname();
        setCurrentNickname(nickname || "");
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!newNickname.trim() || !isValidated) return;
    try {
      await updateNickname(newNickname.trim());
      navigate("/mypage");
    } catch (e) {
      console.error(e);
    }
  };

  const isSubmitDisabled = !newNickname.trim() || !isValidated;

  return (
    <div className={styles.accountEditContainer}>
      <BackHeader title="계정정보" />

      <div className={styles.content}>
        <NicknameEditSection
          currentNickname={currentNickname}
          newNickname={newNickname}
          onNicknameChange={setNewNickname}
          onValidationChange={setIsValidated}
        />
      </div>

      <SubmitSection onSubmit={handleSubmit} disabled={isSubmitDisabled} />
    </div>
  );
}
