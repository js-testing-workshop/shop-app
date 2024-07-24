import CartPage from "../src/pages/cart/index.js";
import HomePage from "../src/pages/home/index.js";

import productStore from "../src/storage/product-store.js";

describe("Add products to cart", () => {
  let homePage;
  let cartPage;

  beforeAll(() => {
    // NOTE: init products store before all tests
    productStore.init();
  });

  beforeEach(() => {
    // TODO: mock appropriate requests for categories, brands and products
    fetchMock.mockResponses();

    homePage = new HomePage();

    document.body.append(homePage.element);
  });

  afterEach(() => {
    fetchMock.resetMocks();
    homePage.destroy();
    homePage = null;
    document.body.innerHTML = "";
    productStore.removeAll();
  });

  it("should be rendered correctly", () => {
    // TODO: put your awesome test here
  });

  it("should have empty cart by default", () => {
    // TIP: 'Cart' button should have '0' products by default
    // TIP: check products store
    // TODO: put your awesome test here
  });

  it("should add product to cart", () => {
    // TIP: 'Cart' button counter should increase
    // TIP: check products store
    // TODO: put your awesome test here
  });

  it("should remove product from cart", () => {
    // TIP: 'Cart' button counter should decrease
    // TIP: check products store
    // TODO: put your awesome test here
  });
});
