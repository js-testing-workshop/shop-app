import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/header';
import { getOrders, Order } from '../../api/payments';
import { Product } from '../../api/products';
import { formatOrderDate } from './helpers';

import './orders-style.css';

const Orders: React.FC = () => {
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    void (async () => {
      try {
        const orders = await getOrders();

        setOrders(orders);
      } catch {
        setError(true);
      }
    })();
  }, []);

  const renderProducts = (products: Product[], orderStatus: string) => {
    if (!products.length) {
      return `<td colspan="7" class="text-center">There is no orders</td>`;
    }
    return products
      .map((product, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>
            <div className="item-preview">
              <img src={product.images[0]} alt={product.title}/>
            </div>
          </td>
          <td className="w-25">{product.title}</td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
          <td>{(product.quantity ?? 1) * product.price}</td>
          <td>{orderStatus}</td>
        </tr>
      ))
  };


  if (error) {
    return 'Something went wrong';
  }

  if (typeof orders === 'undefined') {
    return 'Loading';
  }

  if (!orders.length) {
    return 'There are no orders yet.';
  }

  return (
    <div className="os-container">
      <Header pageTitle="Orders"/>

      <main className="">
        {orders.map((order) => (
          <table className="table caption-top" key={order.created}>
            <caption>Order from {formatOrderDate(order.created)}</caption>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody data-element="tbody">{renderProducts(order.products, order.status)}</tbody>
          </table>
        ))}
      </main>
    </div>
  );
};


export default Orders;