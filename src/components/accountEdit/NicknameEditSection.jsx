import CurrentNicknameField from './CurrentNicknameField';
import NicknameInputField from './NicknameInputField';
import styles from './NicknameEditSection.module.css';

export default function NicknameEditSection({ 
  currentNickname, 
  newNickname, 
  onNicknameChange, 
  onValidationChange 
}) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>닉네임 수정</h2>
      
      <CurrentNicknameField nickname={currentNickname} />
      
      <NicknameInputField 
        value={newNickname}
        onChange={onNicknameChange}
        onValidationChange={onValidationChange}
      />
    </div>
  );
} 