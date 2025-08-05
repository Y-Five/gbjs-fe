import ProfileSection from '../components/myPage/ProfileSection';
import CollectionStats from '../components/myPage/CollectionStats';
import AccountInfo from '../components/myPage/AccountInfo';
import SettingsSection from '../components/myPage/SettingsSection';
import PolicySection from '../components/myPage/PolicySection';
import Header from '../components/header/Header';
import styles from './MyPage.module.css';

export default function MyPage() {
  return (
    <div className={styles.myPageContainer}>
      <Header title="마이페이지" isDark={true} />
      
      <div className={styles.main}>
        <ProfileSection userName="나나난님" />
        <CollectionStats collectedCount={17} totalCount={100} />
        <AccountInfo 
          nickname="나나난"
          email="heritage@example.com"
          message="소상 공인 인증 계정"
        />
        <SettingsSection />
        <PolicySection />
      </div>
    </div>
  );
} 