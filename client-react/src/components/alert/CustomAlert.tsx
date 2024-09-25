import React from 'react';
import './customAlert.css';
import { AlertType } from '../../types/alert.ts';

interface CustomAlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}

const alertTypeClass = {
  success: 'alert-success',
  danger: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
};

const CustomAlert: React.FC<CustomAlertProps> = ({ type, message, onClose }) => {
  return (
    <div className={`alert ${alertTypeClass[type]} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default CustomAlert;