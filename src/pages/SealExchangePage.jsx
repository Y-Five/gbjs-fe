import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import styles from './SealExchangePage.module.css';
import { getSealProducts } from '../apis/sealApi';

export default function SealExchangePage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 폼 상태
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

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

  useEffect(() => {
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

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

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

    console.log('교환 신청:', {
      productId: product?.id,
      productName: product?.name,
      phoneNumber,
      name,
      address,
      detailAddress,
      zipCode,
    });

    alert('교환 신청이 완료되었습니다!');
    navigate('/sealshop');
  };

  const isShippingProduct = product?.id === 2;

  if (loading) {
    return (
      <div className={styles.page}>
        <Header title="상품 교환" isDark={true} />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Header title="상품 교환" isDark={true} />
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <button onClick={handleBackClick} className={styles.backButton}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header title="상품 교환" isDark={true} />

      <main className={styles.main}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <img
              src={product?.imageUrl}
              alt={product?.name}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product?.name}</h3>
            <p className={styles.productDescription}>{product?.description}</p>
            <span className={styles.requiredSeals}>
              스티커 {product?.price}개 필요
            </span>
          </div>
        </div>

        <div className={styles.exchangeForm}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>교환 신청</h3>
            <p className={styles.formSubtitle}>
              {isShippingProduct
                ? '배송 정보를 입력해주세요'
                : '연락처를 입력해주세요'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber" className={styles.label}>
                전화번호 <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="010-0000-0000"
                className={styles.input}
                maxLength="13"
                required
              />
              <p className={styles.helpText}>
                하이픈(-) 없이 입력해도 자동으로 추가됩니다
              </p>
            </div>

            {isShippingProduct && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    받는 사람 <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="받는 사람 이름"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="zipCode" className={styles.label}>
                    우편번호 <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.addressSearchContainer}>
                    <input
                      type="text"
                      id="zipCode"
                      value={zipCode}
                      placeholder="우편번호"
                      className={styles.input}
                      readOnly
                      required
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className={styles.addressSearchButton}
                    >
                      주소 검색
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.label}>
                    기본주소 <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    placeholder="기본주소"
                    className={styles.input}
                    readOnly
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="detailAddress" className={styles.label}>
                    상세주소 <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="detailAddress"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="상세주소"
                    className={styles.input}
                    required
                  />
                </div>
              </>
            )}

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleBackClick}
                className={styles.cancelButton}
              >
                취소
              </button>
              <button type="submit" className={styles.submitButton}>
                교환 신청
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
