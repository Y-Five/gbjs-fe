import styles from '../../pages/SealExchangePage.module.css';

const ExchangeForm = ({
  isShippingProduct,
  phoneNumber,
  name,
  address,
  detailAddress,
  zipCode,
  onPhoneNumberChange,
  onNameChange,
  onDetailAddressChange,
  onAddressSearch,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className={styles.exchangeForm}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>교환 신청</h3>
        <p className={styles.formSubtitle}>
          {isShippingProduct
            ? '배송 정보를 입력해주세요'
            : '연락처를 입력해주세요'}
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            전화번호 <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
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
                onChange={onNameChange}
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
                  onClick={onAddressSearch}
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
                onChange={onDetailAddressChange}
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
            onClick={onCancel}
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
  );
};

export default ExchangeForm;
