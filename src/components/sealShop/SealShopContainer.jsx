import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSealProducts, getUserSeals } from '../../apis/sealApi';
import { useAuth } from '../../hooks/useAuth';

export default function SealShopContainer({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn, checkLoginStatus } = useAuth();
  const [collectedSeals, setCollectedSeals] = useState(0);
  const [totalSeals, setTotalSeals] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      await fetchData();
    };

    initializeData();
  }, []);

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 사용자 띠부씰 데이터 다시 가져오기
    if (isLoggedIn) {
      fetchUserSeals();
    } else {
      setCollectedSeals(0);
      setTotalSeals(0);
    }
  }, [isLoggedIn]);

  const fetchUserSeals = async () => {
    try {
      const sealsResponse = await getUserSeals();

      if (sealsResponse?.data) {
        setCollectedSeals(sealsResponse.data.collectedCount || 0);
        setTotalSeals(sealsResponse.data.totalCount || 0);
      } else if (sealsResponse) {
        setCollectedSeals(sealsResponse.collectedCount || 0);
        setTotalSeals(sealsResponse.totalCount || 0);
      }
    } catch (sealsError) {
      console.error('사용자 띠부씰 조회 실패:', sealsError);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const productsResponse = await getSealProducts();
      const productsData =
        productsResponse?.data?.products || productsResponse?.products || [];
      setProducts(Array.isArray(productsData) ? productsData : []);

      // 로그인된 경우 사용자 띠부씰 데이터 가져오기
      if (isLoggedIn) {
        await fetchUserSeals();
      }
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAllSealsClick = () => {
    navigate('/allseals');
  };

  const handleShopButtonClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // 스크롤 로직은 부모 컴포넌트에서 처리
  };

  const handleProductClick = (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (collectedSeals < product.price) {
      setSelectedProduct(product);
      setShowInsufficientModal(true);
    } else {
      navigate(`/sealshop/exchange/${product.id}`);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseInsufficientModal = () => {
    setShowInsufficientModal(false);
  };

  const contextValue = {
    // 상태
    collectedSeals,
    totalSeals,
    products,
    loading,
    selectedProduct,
    showInsufficientModal,
    showLoginModal,
    isLoggedIn,

    // 핸들러
    handleAllSealsClick,
    handleShopButtonClick,
    handleProductClick,
    handleLoginClick,
    handleCloseLoginModal,
    handleCloseInsufficientModal,
  };

  return children(contextValue);
}
