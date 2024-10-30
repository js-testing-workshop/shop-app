import { createContext } from 'react';
import { ProductsCollection } from './types.ts';
import { Product } from '../../types/product.ts';

export interface CartContextProps {
  productsCollection: ProductsCollection;
  productsCount: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseProductCounter: (id: string) => void;
  decreaseProductCounter: (id: string) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);
