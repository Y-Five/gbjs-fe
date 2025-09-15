import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSealProducts } from '../../apis/sealApi';
import { useAuth } from '../../hooks/useAuth';

export default function SealExchangeContainer({ children }) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 폼 상태
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getSealProducts();

      if (response?.products?.length > 0) {
        const foundProduct = response.products.find(
          (p) => p.id === parseInt(productId)
        );
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('상품을 찾을 수 없습니다.');
        }
      } else {
        setError('상품 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('상품 조회 실패:', error);
      setError('상품 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length <= 3) {
      setPhoneNumber(value);
    } else if (value.length <= 7) {
      setPhoneNumber(value.slice(0, 3) + '-' + value.slice(3));
    } else {
      setPhoneNumber(
        value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11)
      );
    }
  };

  const handleAddressSearch = () => {
    if (!window.daum?.Postcode) {
      alert(
        '주소 검색 서비스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr +=
              extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          addr += extraAddr;
        }

        setZipCode(data.zonecode);
        setAddress(addr);
        document.getElementById('detailAddress').focus();
      },
    }).open();
  };

  const handleBackClick = () => {
    navigate('/sealshop');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      alert('올바른 전화번호 형식을 입력해주세요.\n예: 010-1234-5678');
      return;
    }

    if (product?.id === 2) {
      if (
        !name.trim() ||
        !address.trim() ||
        !detailAddress.trim() ||
        !zipCode.trim()
      ) {
        alert('모든 배송 정보를 입력해주세요.');
        return;
      }
    }

    alert('교환 신청이 완료되었습니다!');
    navigate('/sealshop');
  };

  const contextValue = {
    // 상태
    product,
    loading,
    error,
    phoneNumber,
    name,
    address,
    detailAddress,
    zipCode,
    isLoggedIn,

    // 핸들러
    handlePhoneNumberChange,
    handleAddressSearch,
    handleBackClick,
    handleSubmit,
    setName,
    setDetailAddress,
  };

  return children(contextValue);
}
