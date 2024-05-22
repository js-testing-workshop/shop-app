export interface ProductI {
  id?: string;
  images: Array<string>;
  title: string;
  rating: number;
  price: number;
  category: string;
  brand: string;
}

export interface QueryI {
  q?: string;
  _limit?: string;
  _page?: string;
  category?: Array<string> | string;
  brand?: Array<string> | string;
  price_lte?: string;
  price_gte?: string;
  rating_lte?: string;
  rating_gte?: string;
}
