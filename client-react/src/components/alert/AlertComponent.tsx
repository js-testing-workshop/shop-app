import React from 'react';
import { useAlert } from './useAlert';
import CustomAlert from './CustomAlert';

const AlertComponent: React.FC = () => {
  const { alert, closeAlert } = useAlert();

  if (!alert) return null;

  return (
    <CustomAlert
      type={alert.type}
      message={alert.message}
      onClose={closeAlert}
    />
  );
};

export default AlertComponent;