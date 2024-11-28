import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/layout/header';
import { useCart } from '../../providers/CartProvider';
import { getPaymentStatus } from '../../api/payments';
import RoutesConfig from '../../RoutesConfig';

const PaymentStatus: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    void (async () => {
      try {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
          throw new Error('sessionId is missing');
        }
        const result = await getPaymentStatus(sessionId);

        if (result?.status === 'complete') {
          clearCart();
          setSuccess(true);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  return (
    <div className="os-container">
      <Header pageTitle="Payment Status"/>

      <main className="payment-status-container">
        <div className="d-flex justify-content-center align-items-center">
          {loading && 'Loading...'}
          {error && 'Something went wrong!'}
          {success && (
            <div>
              <div className="mb-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  fill="currentColor"
                  className="bi bi-check-circle-fill text-success"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h1>Thank You !</h1>
                <p>Payment successfully passed</p>
                <Link to={RoutesConfig.home.path}>
                  <button className="btn btn-primary">Back Home</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentStatus;