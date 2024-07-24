import request from "supertest";
import app from "../../app";
import { db } from "common";
import { products } from "./filters/__mock__/products";

const newProduct = {
  id: "new_product_id",
  images: ["https://new_product.image.com"],
  title: "Amazing product",
  rating: 5.0,
  price: 77777,
  category: "nuclear weapons",
  brand: "secret",
};

// use original implementation for all methods in common module except 'requireAuth
jest.mock("common", () => {
  const original = jest.requireActual("common");

  return {
    ...original,
    requireAuth: jest.fn(async (req: any, res: any, next: any) => {
      req.currentUser = global.currentUser;
      next();
    }),
  };
});

const dbMockRead = jest.spyOn(db, "read").mockResolvedValue(products);
const dbMockWrite = jest.spyOn(db, "write").mockResolvedValue(newProduct);

describe("products route", () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // @ts-ignore
    dbMockRead.mockClear();
    dbMockWrite.mockClear();
  });

  it("should return list of products", async () => {
    // TODO: add your awesome tests here
  });

  it("should set X-Total-Count header when fetching a list of products", async () => {
    // TODO: add your awesome tests here
  });

  it("should create a new product when data is valid", async () => {
    // TODO: add your awesome tests here
  });

  it("should not create a new product when data is invalid", async () => {
    // TODO: add your awesome tests here
  });


  // TODO: add your awesome tests here

});
