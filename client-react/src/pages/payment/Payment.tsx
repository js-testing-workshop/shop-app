import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import Header from '../../components/layout/header';
import { useCart } from '../../providers/CartProvider';
import { getClientSecret } from '../../api/payments.ts';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY as string);

const PaymentPage: React.FC = () => {
  const { productsCollection } = useCart();

  const fetchClientSecret = useCallback(() => {
    return getClientSecret(Object.values(productsCollection))
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (

    <div className="os-container">
      <Header pageTitle="Payment page"/>

      <main className="payment-container">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </main>
    </div>
  );
};


export default PaymentPage;