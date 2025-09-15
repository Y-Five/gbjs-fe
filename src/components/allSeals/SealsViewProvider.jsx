import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function SealsViewProvider({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showUserSeals, setShowUserSeals] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleViewToggle = (showUser) => {
    if (showUser && !isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowUserSeals(showUser);
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleBackClick = () => navigate('/sealshop');

  return children({
    showUserSeals,
    showLoginModal,
    isLoggedIn,
    handleViewToggle,
    handleLoginClick,
    handleCloseLoginModal,
    handleBackClick,
  });
}
