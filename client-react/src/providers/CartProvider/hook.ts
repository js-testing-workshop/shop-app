import { useContext } from 'react';
import { CartContextProps, CartContext } from './CartContext';

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};