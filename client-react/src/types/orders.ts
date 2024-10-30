import { Product } from './product.ts';

export interface Order {
  status: string;
  created: number;
  products: Product[];
}
