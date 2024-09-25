import { useState, FC, PropsWithChildren, useCallback } from 'react';

import { CartContext, CartContextProps } from './CartContext.ts';
import { Product } from '../../types/product.ts';
import LocalStorageService from '../../services/local-storage';
import { useUpdateEffect } from '../../hooks/use-update-effect.ts';
import { getProductsCount, getTotalPrice } from './utils.ts';

const PRODUCTS_COLLECTION_KEY = 'products-in-cart';

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storage] = useState(new LocalStorageService(localStorage, 'cart-storage'));
  const [productsCollection, setProductsCollection] = useState<Record<string, Product>>(() => storage.get<Record<string, Product>>(PRODUCTS_COLLECTION_KEY) ?? {});
  const [productsCount, setProductsCount] = useState<number>(() => getProductsCount(Object.values(productsCollection)));
  const [totalPrice, setTotalPrice] = useState<number>(() => getTotalPrice(Object.values(productsCollection)));

  useUpdateEffect(() => {
    storage.set(PRODUCTS_COLLECTION_KEY, productsCollection); // TODO: Consider setting only products IDs, but bear in mind handling products count

    setProductsCount(getProductsCount(Object.values(productsCollection)));
    setTotalPrice(getTotalPrice(Object.values(productsCollection)));
  }, [productsCollection]);

  const increaseProductCounter = useCallback((id: string) => {
    setProductsCollection((prev) => {
      if (!prev[id]) {
        throw new Error(`There is no product with id: ${id}`);
      }

      return { ...prev, [id]: { ...prev[id], count: (prev[id]?.count ?? 1) + 1 } }; // preventing direct state mutations
    });
  }, []);

  const decreaseProductCounter = useCallback((id: string) => {
    setProductsCollection((prev) => {
      if (!prev[id]) {
        throw new Error(`There is no product with id: ${id}`);
      }

      const collection = { ...prev, [id]: { ...prev[id], count: (prev[id].count ?? 1) - 1 } }; // preventing direct state mutations

      if (collection[id].count === 0) {
        delete collection[id];
      }

      return collection;
    });
  }, []);

  const addToCart = useCallback((product: Product) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    setProductsCollection((prev) => ({ ...prev, [product.id]: { ...product, count: product.count || 1 } }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setProductsCollection((prev) => {
      const state = { ...prev };
      delete state[id];
      return state;
    });
  }, []);

  const clearCart = useCallback(() => {
    setProductsCollection({});
  }, []);

  const providerValue: CartContextProps = {
    productsCollection,
    productsCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    increaseProductCounter,
    decreaseProductCounter,
  };

  return <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>;
};
