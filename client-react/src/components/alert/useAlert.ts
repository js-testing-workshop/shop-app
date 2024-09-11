import { useContext } from 'react';
import { AlertContext, AlertContextProps } from './alertContext';

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};