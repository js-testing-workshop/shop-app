import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from './CustomAlert.tsx';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

export interface AlertContextProps {
  showAlert: (type: Alert['type'], message: string, duration?: number) => void;
}

export const AlertContext = createContext<AlertContextProps | null>(null);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const timerIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const showAlert = (type: Alert['type'], message: string, duration = 2000) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    setAlert({ type, message });

    timerIdRef.current = setTimeout(() => {
      setAlert(null);
    }, duration);
  };

  const closeAlert = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    setAlert(null);
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && createPortal(
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />,
        document.body
      )}
    </AlertContext.Provider>
  );
};