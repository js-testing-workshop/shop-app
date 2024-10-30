import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesList } from '../../Routes.enum.ts';

const NotFound: React.FC = () => {

  return (
    <div className="os-container">
      <main>
        <h1 className="app-page-title">404 Page</h1>
        <Link to={RoutesList.HOME}>go to home</Link>
      </main>
    </div>
  );
};

export default NotFound;