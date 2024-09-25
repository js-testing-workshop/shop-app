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

export interface ProductsFilter {
  page: number;
  limit: number;
  query: string;
}