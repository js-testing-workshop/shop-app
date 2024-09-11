import React, { useEffect, useState } from 'react';
import './modal-style.css';

interface ModalProps {
  component: React.ReactNode;
  isOpen: boolean | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ component, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('pointerdown', handleClickOutside, true);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside, true);
    };
  }, [isOpen]);

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

  if (!isVisible) return null;

  return (
    <div className="app-modal" data-cy="app-modal">
      <div className="modal__content" data-element="modalContainer">
        <div data-element="content">{component}</div>
      </div>
    </div>
  );
};

export default Modal;