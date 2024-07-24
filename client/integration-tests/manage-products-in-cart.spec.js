import CartPage from "../src/pages/cart/index.js";

import productStore from "../src/storage/product-store.js";

describe("Cart page", () => {
    let page;

  beforeAll(() => {
    // TIP: init productStore with some data
    productStore.init();
  });

  beforeEach(() => {
    page = new CartPage();

    document.body.append(page.element);
  });

  afterEach(() => {
    fetchMock.resetMocks();
    page.destroy();
    page = null;
    document.body.innerHTML = "";
    productStore.removeAll();
  });

  it("should be rendered correctly", () => {
    expect(page.element).toBeInTheDocument();
    expect(page.element).toBeVisible();
  });
  
  it("should not allow to order a product(s) for a non logged in user", () => {
    // TIP: check if 'Order' button is present
  });

  it("should increase amount of products", () => {
    // TODO: ...
  });

  it("should decrease amount of products", () => {
    // TODO: ...
  });

  it("should update the price correctly", () => {
    // TIP: toggle products count and check the price
  });

  it("should clear the cart", () => {
    // TODO: ...
  });
});
