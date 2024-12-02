import React from 'react';
import { Link } from 'react-router-dom';
import RoutesConfig from '../../RoutesConfig';

const NotFound: React.FC = () => {

  return (
    <div className="os-container">
      <main>
        <h1 className="app-page-title">404 Page</h1>
        <Link to={RoutesConfig.home.path}>go to home</Link>
      </main>
    </div>
  );
};

export default NotFound;