import CartPage from "../src/pages/cart/index.js";
import HomePage from "../src/pages/home/index.js";

import productStore from "../src/storage/product-store.js";

describe("Add product to cart", () => {
  let page;
  let homePage;

  beforeAll(() => {
    // NOTE: init products store before all tests
    productStore.init();
  });

  beforeEach(() => {
    // TODO: mock appropriate responses
    fetchMock.mockResponses();

    page = new CartPage();
    homePage = new HomePage();

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

  // TODO: add your test cases here...
});
