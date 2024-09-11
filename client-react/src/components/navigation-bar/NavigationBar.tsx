import { useState } from "react";
import Modal from "../modal/Modal";
import LoginForm from "../login-form/LoginForm";
import { isAuthorized } from "../../router/guards";
import userStore from "../../storage/user";
import { signOut } from "../../api/auth";
import { useAlert } from "../alert/useAlert";
import { Link } from 'react-router-dom';


const NavigationBar = () => {
  const { showAlert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false as boolean | null);

  const links = [
    { name: "Home", path: "/home", guard: () => true },
    {
      name: "Create product",
      path: "/create-product",
      guard: () => isAuthorized(),
    },
    { name: "Orders", path: "/orders", guard: () => isAuthorized() },
  ];

  const buttons = [
    { name: "Login", guard: () => !isAuthorized() },
    { name: "Logout", guard: () => isAuthorized() },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    try {
      await signOut();

      showAlert("success", "Logout success");
      userStore.logout();
    } catch (error) {
      showAlert("danger", (error as Error).message);
    }
    setIsModalOpen(() => null);
  };

  return (
    <header className="header" data-element="navigationBar">
      <nav className="header navbar navbar-expand-lg bg-body-tertiary">
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
                link.guard() ? (
                  <li className="nav-item" key={link.name}>
                    <Link className="nav-link" aria-current="page" to={link.path}>
                      {link.name}
                    </Link>
                  </li>
                ) : null
              )}
              {buttons.map((button) =>
                button.guard() ? (
                  <li className="nav-item" key={button.name}>
                    <button
                      type="button"
                      className="btn btn-link"
                      data-element={`${button.name.toLowerCase()}Btn`}
                      data-cy={`${button.name.toLowerCase()}-Btn`}
                      onClick={button.name === "Login" ? openModal : handleLogout}
                    >
                      {button.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
        <Modal
          component={<LoginForm onSuccessCallback={closeModal} />}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </nav>
    </header>
  );
};

export default NavigationBar;
