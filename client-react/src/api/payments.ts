import { httpRequest } from '../request';
import { Product } from '../types/product';
import { Order } from '../types/orders';

const getBaseUrl = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  return new URL('payments/', BACKEND_URL);
};

interface GetClientSecretResponse {
  clientSecret: string;
}

export const getClientSecret = async (data: Product[] = []): Promise<GetClientSecretResponse> => {
  const result = await httpRequest.post(getBaseUrl(), {
    body: JSON.stringify({
      products: data.map((item) => ({
        brand: item.brand,
        category: item.category,
        images: item.images,
        price: item.price,
        quantity: item.count!,
        rating: item.rating,
        title: item.title,
      }))
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return result as GetClientSecretResponse;
};

export const getOrders = async () => {
  const orders = await httpRequest.get(new URL('orders', getBaseUrl()));

  return orders as Order[];
};

export const getPaymentStatus = async (sessionId = '') => {
  const url = new URL('payment-status', getBaseUrl());

  url.search = new URLSearchParams(`session_id=${sessionId}`).toString();

  const status = await httpRequest.get(url);

  return status as { status: string };
};
