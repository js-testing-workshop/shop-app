import { useContext } from 'react';
import { UserContextProps, UserContext } from './UserContext.ts';

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a UserProvider');
  }

  return context;
};