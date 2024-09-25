import React from 'react';
import { Link } from 'react-router-dom';
import './cart.css';
import { useCart } from '../../providers/CartProvider';
import { useUser } from '../../providers/UserProvider';
import Header from '../../components/layout/header';

const Cart: React.FC = () => {
  const { isAuthorized } = useUser();
  const {
    productsCollection,
    totalPrice,
    productsCount,
    clearCart,
    increaseProductCounter,
    decreaseProductCounter
  } = useCart();

  if (productsCount === 0) {
    return 'There is no items in the cart';
  }

  return (
    <div className="os-container">
      <Header pageTitle="Cart Page"/>

      <main className="cart-container">
        <section>
          <ul className="cart-list">
            {Object.values(productsCollection).map((product) => (<li className="item-row" key={product.id}>
              <div className="item-preview">
                <img src={product.images[0]} alt={product.title}/>
              </div>
              <div className="item-name">
                {product.title}
              </div>
              <div className="item-counter">
                <button className="count-btn" onClick={() => decreaseProductCounter(product.id)}>
                  <i className="bi bi-dash-circle"></i>
                </button>
                <span>{product.count}</span>
                <button className="count-btn" onClick={() => increaseProductCounter(product.id)}>
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
              <div className="item-price">
                {product.price * (product.count ?? 1)}
              </div>
            </li>))}
          </ul>
          <div className="footer">
            <div className="cart-total">
              Total: <span data-element="total">{totalPrice}</span>
            </div>
            <button className="os-btn-primary clear-cart-btn" onClick={clearCart}>Clear Cart</button>

            {isAuthorized && (
              <Link to="/payment">
                <button className="os-btn-primary" data-cy="order-btn">Order</button>
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};


export default Cart;