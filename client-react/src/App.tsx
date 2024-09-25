import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Home';
import CartPage from './pages/cart/Cart';
import { CartProvider } from './providers/CartProvider';
import { UserProvider } from './providers/UserProvider';
import NavigationBar from './components/layout/navigation-bar/NavigationBar';

const App = () => {

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="app-main">
            <NavigationBar/>
            <div id="content" className="content">
              <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
              </Routes>
            </div>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;