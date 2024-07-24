import request from "supertest";
import app from "../app";
// @ts-ignore
import Stripe, { mockSessionCreate } from "stripe";

// use original implementation for all methods in common module except 'requireAuth
jest.mock("common", () => {
  // TIP: mock current user implementation
});

describe("payments", () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // @ts-ignore
    mockSessionCreate.mockClear();
  });

  it("should fail to create a payment when no products passed", async () => {
    // TODO: ...
  });

  it("should fail to create a payment when product data is invalid", async () => {
    const products = [
      {
        id: "76w0hz7015kkr9kjkav",
        images: [],
        title: "",
        price: 0,
        category: "laptops",
        brand: "acer",
      },
    ];

    // TODO: ...
  });

  it("should successfully create a payment", async () => {
    const products = [
      {
        id: "76w0hz7015kkr9kjkav",
        images: [
          "https://content2.rozetka.com.ua/goods/images/big_tile/370191080.jpg",
        ],
        title:
          "Acer Aspire 5 A515-57-59VX Steel Gray (NX.KN4EU.00C) / Intel Core i5-12450H / RAM 16 ГБ / SSD 512 ГБ",
        rating: 2.89,
        price: 15999,
        category: "laptops",
        brand: "acer",
        quantity: 2,
      },
      {
        id: "qeagrlm9lrkr9kjkav",
        images: [
          "https://content1.rozetka.com.ua/goods/images/big_tile/178060622.jpg",
          "https://content2.rozetka.com.ua/goods/images/big_tile/178060625.jpg",
        ],
        title:
          "Laptop Acer Aspire 7 A715-41G-R9KP (NH.Q8QEU.00L) Charcoal Black",
        rating: 1.96,
        price: 21500,
        category: "laptops",
        brand: "acer",
        quantity: 10,
      },
    ];

    // TIP: check mocked Stripe (__mocks__ directory) called correctly
  });
});
