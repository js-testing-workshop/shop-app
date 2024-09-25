import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../modal/Modal.tsx';
import LoginForm from '../../login-form/LoginForm.tsx';
import { useUser } from '../../../providers/UserProvider';

const NavigationBar: React.FC = () => {
  const { logout, isAuthorized } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/home', show: true },
    {
      name: 'Create product',
      path: '/create-product',
      show: isAuthorized,
    },
    { name: 'Orders', path: '/orders', show: isAuthorized },
  ];

  const closeModal = () => setIsModalOpen(false);

  const loginClickHandler = () => {
    setIsModalOpen(true);
  };

  const logoutClickHandler = () => {
    void logout().finally(closeModal);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid p-0">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav justify-content-end flex-grow-1">
            {links.map((link) =>
                link.show && (
                  <li className="nav-item" key={link.name}>
                    <Link className="nav-link" aria-current="page" to={link.path}>
                      {link.name}
                    </Link>
                  </li>
                )
            )}

            {isAuthorized ? (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-link"
                  data-cy="logout-btn"
                  onClick={logoutClickHandler}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-link"
                  data-cy="login-btn"
                  onClick={loginClickHandler}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Modal
        component={<LoginForm onSuccessCallback={closeModal}/>}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </nav>
  );
};

export default NavigationBar;
