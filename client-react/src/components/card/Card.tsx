import React, { useState } from 'react';
import './card-style.css';
import { Product } from '../../models/Product';

interface CardProps {
  data: Product;
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ data, onAddToCart, onRemoveFromCart }) => {
  const [inStore, setInStore] = useState(data.inStore);

  const handleClick = () => {
    if (inStore) {
      onRemoveFromCart(data.id);
      setInStore(false);
    } else {
      onAddToCart(data.id);
      setInStore(true);
    }
  };

  const footer = () => {
    const labelValue = inStore ? 'Remove from cart' : 'Add to cart';
    const classValue = inStore ? 'active' : '';

    return (
      <button
        className={`os-btn-primary ${classValue}`}
        data-element="addToCartBtn"
        type="button"
        data-cy="add-to-cart-btn"
        onClick={handleClick}
      >
        {labelValue}
      </button>
    );
  };

  return (
    <div className="os-product-card">
      <div className="os-product-img" style={{ backgroundImage: `url(${data?.images?.[0] ?? ''})` }}></div>

      <div className="os-product-content">
        <div className="os-product-price-wrapper">
          <div className="os-product-rating">
            <span>{data?.rating}</span>
            <i className="bi bi-star"></i>
          </div>

          <div className="os-product-price">{data?.price}</div>
        </div>

        <h5 className="os-product-title">{data?.title}</h5>
        <p className="os-product-description">{`${data?.brand} ${data?.category}`}</p>
      </div>

      <footer className="os-product-footer">{footer()}</footer>
    </div>
  );
};

export default Card;