import request from "supertest";
import app from "../../app";
// @ts-ignore
import Stripe, { mockSessionsList } from "stripe";

describe("payments", () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // @ts-ignore
    mockSessionsList.mockClear();
  });

  it("should return orders list", async () => {
    // TODO: ...
  });
});
