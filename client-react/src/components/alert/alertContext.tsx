import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AlertType } from '../../types/alert';

interface Alert {
  type: AlertType;
  message: string;
}

export interface AlertContextProps {
  alert: Alert | null;
  showAlert: (type: Alert['type'], message: string, duration?: number) => void;
  closeAlert: () => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showAlert = (type: Alert['type'], message: string, duration = 2000) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAlert({ type, message });

    const newTimeoutId = setTimeout(() => {
      setAlert(null);
    }, duration);

    setTimeoutId(newTimeoutId);
  };

  const closeAlert = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setAlert(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};