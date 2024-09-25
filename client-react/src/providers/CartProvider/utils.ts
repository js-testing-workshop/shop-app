import { Product } from '../../types/product.ts';

export const getTotalPrice = (products: Product[]) => {
  let total = 0;

  for (const product of products) {
    total += product.price * (product.count ?? 0);
  }

  return total;
};

export const getProductsCount = (products: Product[]) => {
  let total = 0;

  for (const product of products) {
    total += product.count ?? 0;
  }

  return total;
}