import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Home';
import NavigationBar from './components/navigation-bar/NavigationBar';

const App = () => {

  return (
    <Router>
      <div className="app-main">
        <NavigationBar />
        <div id="content" className="content">
          <Routes>
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;