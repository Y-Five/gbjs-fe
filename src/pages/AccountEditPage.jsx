import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/header/BackHeader';
import { NicknameEditSection, SubmitSection } from '../components/accountEdit';
import styles from './AccountEditPage.module.css';

export default function AccountEditPage() {
  const navigate = useNavigate();
  const [currentNickname] = useState('나나난');
  const [newNickname, setNewNickname] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = () => {
    if (!newNickname.trim() || !isValidated) return;

    navigate('/mypage');
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

      <SubmitSection 
        onSubmit={handleSubmit}
        disabled={isSubmitDisabled}
      />
    </div>
  );
} 