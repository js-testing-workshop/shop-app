import HomePage from './pages/home/Home';
import CartPage from './pages/cart/Cart';
import OrdersPage from './pages/orders/Orders';
import CreateProductPage from './pages/create-product/CreateProduct';
import PaymentPage from './pages/payment/Payment';
import PaymentStatusPage from './pages/payment-status/PaymentStatus';

export default {
  home: {
    path: '/',
    component: <HomePage/>,
  },
  createProduct: {
    path: '/create-product',
    component: <CreateProductPage/>,
  },
  cart: {
    path: '/cart',
    component: <CartPage/>,
  },
  orders: {
    path: '/orders',
    component: <OrdersPage/>,
  },
  payment: {
    path: '/payment',
    component: <PaymentPage/>,
  },
  paymentStatus: {
    path: '/payment-status',
    component: <PaymentStatusPage/>,
  },
}