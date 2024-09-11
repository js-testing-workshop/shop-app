export interface Product {
  id: string;
  images: string[];
  rating: number;
  price: string;
  title: string;
  brand: string;
  category: string;
  inStore?: boolean;
  quantity?: number;
  count?: number;
}