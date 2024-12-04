import React, { useEffect } from 'react';

import './modal-style.css';

interface ModalProps {
  component: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ component, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const isModal = (event.target as HTMLElement).closest('[data-element="modalContainer"]');
      if (!isModal) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleClickOutside, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="app-modal" data-cy="app-modal" role="dialog">
      <div className="modal__content" data-element="modalContainer">
        <div data-element="content">{component}</div>
      </div>
    </div>
  );
};

export default Modal;