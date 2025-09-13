import { useEffect, useState } from "react";
import ProfileSection from "../components/myPage/ProfileSection";
import CollectionStats from "../components/myPage/CollectionStats";
import AccountInfo from "../components/myPage/AccountInfo";
import SettingsSection from "../components/myPage/SettingsSection";
import PolicySection from "../components/myPage/PolicySection";
import Header from "../components/header/Header";
import styles from "./MyPage.module.css";
import { getMyInfo } from "../apis/myPageApi";

export default function MyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const me = await getMyInfo();
        if (isMounted) setUser(me);
      } catch (e) {
        // 실패 시 기본값 유지
        console.error(e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const nickname = user?.nickname ?? "";
  const email = user?.email ?? "";
  const sealCount = user?.sealCount ?? 0;
  const profileImageUrl = user?.profileImageUrl ?? "";

  return (
    <div className={styles.myPageContainer}>
      <Header title="마이페이지" isDark={true} />

      <div className={styles.main}>
        <ProfileSection nickname={nickname} profileImageUrl={profileImageUrl} />
        <CollectionStats collectedCount={sealCount} totalCount={100} />
        <AccountInfo
          nickname={nickname}
          email={email}
          message={user ? "소상 공인 인증 계정" : ""}
        />
        <SettingsSection
          ttsSetting={user?.ttsSetting}
          emailMarketingConsent={user?.emailMarketingConsent}
          pushNotificationConsent={user?.pushNotificationConsent}
          locationConsent={user?.locationConsent}
        />
        <PolicySection />
      </div>
    </div>
  );
}
