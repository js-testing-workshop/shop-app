import { Product } from "../models/Product.ts";
import { httpRequest } from "../request/index.ts";
import { uploadToImgur } from "./imgur-img-upload.ts";

const getBaseUrl = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  return new URL("shop/", BACKEND_URL);
};

export const getProducts = async (search: URLSearchParams): Promise<{products: Product[], total: number}> => {
  const url = new URL("products", getBaseUrl());

  url.search = search.toString();

  const { data, response } = await httpRequest.request(url);
  const total = parseInt(response.headers.get("X-Total-Count") ?? "0", 10);

  return {
    products: data as Product[],
    total,
  };
};

export const createProduct = async (body = {}, options = {}) => {
  const url = new URL("products", getBaseUrl());
  const obj = Object.fromEntries(Object.entries(body));

  if ((obj.image as File).size > 0) {
    const response = await uploadToImgur(obj.image as File);
    const { link } = response.data;

    obj.images = [link];
  }

  // NOTE: cleare image filed because backend expects imageS field
  delete obj.image;

  const result = await httpRequest.post(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
    ...options,
  });

  return result;
};

export const getCategories = async () => {
  const url = new URL("categories", getBaseUrl());
  const result = await httpRequest.get(url);

  return result;
};

export const getBrands = async () => {
  const url = new URL("brands", getBaseUrl());
  const result = await httpRequest.get(url);

  return result;
};
