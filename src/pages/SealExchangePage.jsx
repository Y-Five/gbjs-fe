import React from 'react';
import BackHeader from '../components/header/BackHeader';
import {
  ProductCard,
  ExchangeForm,
  SealExchangeContainer,
  LoadingState,
  ErrorState,
} from '../components/sealExchange';
import styles from './SealExchangePage.module.css';

export default function SealExchangePage() {
  return (
    <SealExchangeContainer>
      {({
        product,
        loading,
        error,
        phoneNumber,
        name,
        address,
        detailAddress,
        zipCode,
        handlePhoneNumberChange,
        handleAddressSearch,
        handleBackClick,
        handleSubmit,
        setName,
        setDetailAddress,
      }) => {
        if (loading) {
          return <LoadingState />;
        }

        if (error) {
          return <ErrorState error={error} onBackClick={handleBackClick} />;
        }

        const isShippingProduct = product?.id === 2;

        return (
          <div className={styles.page}>
            <BackHeader title="상품 교환" />

            <main className={styles.main}>
              <ProductCard product={product} />

              <ExchangeForm
                isShippingProduct={isShippingProduct}
                phoneNumber={phoneNumber}
                name={name}
                address={address}
                detailAddress={detailAddress}
                zipCode={zipCode}
                onPhoneNumberChange={handlePhoneNumberChange}
                onNameChange={(e) => setName(e.target.value)}
                onDetailAddressChange={(e) => setDetailAddress(e.target.value)}
                onAddressSearch={handleAddressSearch}
                onSubmit={handleSubmit}
                onCancel={handleBackClick}
              />
            </main>
          </div>
        );
      }}
    </SealExchangeContainer>
  );
}
