import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './providers/CartProvider';
import { UserProvider } from './providers/UserProvider';
import HomePage from './pages/home/Home';
import CartPage from './pages/cart/Cart';
import OrdersPage from './pages/orders/Orders';
import CreateProductPage from './pages/create-product/CreateProduct.tsx';
import NotFoundPage from './pages/not-found/NotFound.tsx';
import PaymentPage from './pages/payment/Payment.tsx';
import PaymentStatusPage from './pages/payment-status/PaymentStatus.tsx';

import NavigationBar from './components/layout/navigation-bar/NavigationBar';
import { RoutesList } from './Routes.enum.ts';

import './App.css';

const App = () => {

  return (
      <UserProvider>
        <CartProvider>
          <Router>
            <div className="app-main">
              <NavigationBar/>
              <div id="content" className="content">
                <Routes>
                  <Route path={RoutesList.HOME} element={<HomePage/>}/>
                  <Route path={RoutesList.CART} element={<CartPage/>}/>
                  <Route path={RoutesList.ORDERS} element={<OrdersPage/>}/>
                  <Route path={RoutesList.CREATE_PRODUCT} element={<CreateProductPage/>}/>
                  <Route path={RoutesList.PAYMENT} element={<PaymentPage/>}/>
                  <Route path={RoutesList.PAYMENT_STATUS} element={<PaymentStatusPage/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
              </div>
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
  );
};

export default App;