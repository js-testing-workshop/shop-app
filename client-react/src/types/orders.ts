import { Product } from './product';

export interface Order {
  status: string;
  created: number;
  products: Product[];
}
