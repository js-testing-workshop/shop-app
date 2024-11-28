import { createContext } from 'react';
import { Product } from '../../types/product';
import { ProductsCollection } from './types';

export interface CartContextProps {
  productsInCart: ProductsCollection;
  productsCount: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseProductCounter: (id: string) => void;
  decreaseProductCounter: (id: string) => void;
}

export const CartContext = createContext<CartContextProps | null>(null);
