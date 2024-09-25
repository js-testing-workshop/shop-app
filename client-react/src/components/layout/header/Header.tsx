import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { useCart } from '../../../providers/CartProvider';

interface HeaderProps {
  pageTitle: string;
  withCartButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, withCartButton }) => {
  const { productsCount } = useCart();

  return (
    <header className="os-header">
      <h2 className="app-page-title">{pageTitle}</h2>

      {withCartButton && (
        <Link to="/cart">
          <button
            className="cart-btn os-btn-primary"
            data-element="cartBtn"
            data-cy="cart-btn"
          >
            <i className="bi bi-cart"></i>
            Cart{' '}
            {productsCount && (
              <span>
                {productsCount}
              </span>
            )}
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;