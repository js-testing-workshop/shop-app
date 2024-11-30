import { useState, FC, PropsWithChildren, useCallback } from 'react';
import LocalStorageService from '../../services/local-storage';
import { useUpdateEffect } from '../../hooks/use-update-effect';
import { Product } from '../../api/products';
import { getProductsCount, getTotalPrice } from './utils';
import { CartContext, CartContextProps } from './CartContext';
import { ProductsCollection } from './types';

const PRODUCTS_COLLECTION_KEY = 'products-in-cart';

const getProductsInCartInitialState = (storage: LocalStorageService): ProductsCollection => storage.get<ProductsCollection>(PRODUCTS_COLLECTION_KEY) ?? {};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storage] = useState(new LocalStorageService(localStorage, 'cart-storage'));
  const [productsInCart, setProductsInCart] = useState<ProductsCollection>(() => getProductsInCartInitialState(storage));
  const [productsCount, setProductsCount] = useState<number>(() => getProductsCount(Object.values(productsInCart)));
  const [totalPrice, setTotalPrice] = useState<number>(() => getTotalPrice(Object.values(productsInCart)));

  useUpdateEffect(() => {
    storage.set(PRODUCTS_COLLECTION_KEY, productsInCart); // TODO: Consider setting only products IDs, but bear in mind handling products count

    setProductsCount(getProductsCount(Object.values(productsInCart)));
    setTotalPrice(getTotalPrice(Object.values(productsInCart)));
  }, [productsInCart]);

  const increaseProductCounter = useCallback((id: string) => {
    setProductsInCart((prev) => {
      if (!prev[id]) {
        throw new Error(`There is no product with id: ${id}`);
      }

      return { ...prev, [id]: { ...prev[id], count: (prev[id]?.count ?? 1) + 1 } }; // preventing direct state mutations
    });
  }, []);

  const decreaseProductCounter = useCallback((id: string) => {
    setProductsInCart((prev) => {
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
    setProductsInCart((prev) => ({ ...prev, [product.id]: { ...product, count: product.count || 1 } }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setProductsInCart((prev) => {
      const state = { ...prev };
      delete state[id];
      return state;
    });
  }, []);

  const clearCart = useCallback(() => {
    setProductsInCart({});
  }, []);

  const providerValue: CartContextProps = {
    productsInCart,
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
