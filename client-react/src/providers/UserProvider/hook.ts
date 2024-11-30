import { useContext } from 'react';
import { UserContextProps, UserContext } from './UserContext';

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useCart must be used within a UserProvider');
  }

  return context;
};