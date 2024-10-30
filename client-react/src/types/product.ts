import { SelectedFilter } from './filter.ts';

export interface Product {
  id: string;
  images: string[];
  rating: number;
  price: number;
  title: string;
  brand: string;
  category: string;
  inStore?: boolean;
  quantity?: number;
  count?: number;
}

export interface ProductsQueryParams {
  page: number;
  limit: number;
  search: string;
  filters: SelectedFilter[];
}