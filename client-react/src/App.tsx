import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './providers/CartProvider';
import { UserProvider } from './providers/UserProvider';
import NavigationBar from './components/layout/navigation-bar/NavigationBar';
import NotFoundPage from './pages/not-found/NotFound';
import RoutesConfig from './RoutesConfig';

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
                {Object.values(RoutesConfig).map((route, index) => (
                  <Route key={index} path={route.path} element={route.component}/>
                ))}
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