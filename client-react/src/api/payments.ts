import { httpRequest } from "../request/index.ts";
import { Product } from '../types/product.ts';

const getBaseUrl = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  return new URL("payments/", BACKEND_URL);
};

export const getClientSecret = async (data: Product[] = []) => {
  const result = await httpRequest.post(getBaseUrl(), {
    body: JSON.stringify({
      products: data.map((item) => {
        item.quantity = item.count!;
        return item;
      }),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result;
};

export const getOrders = async () => {
  const orders = await httpRequest.get(new URL("orders", getBaseUrl()));

  return orders;
};

export const getPaymentStatus = async (sessionId = "") => {
  const url = new URL("payment-status", getBaseUrl());

  url.search = new URLSearchParams(`session_id=${sessionId}`).toString();

  const status = await httpRequest.get(url);

  return status;
};
