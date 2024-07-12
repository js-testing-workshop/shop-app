import HomePage from "../src/pages/home/index.js";

import productStore from "../src/storage/product-store.js";

const categories = ["Laptops", "Monitors", "SSD"];
const brands = ["Acer", "Apple", "Asus"];
const products = [
  {
    title: "new product",
    price: 100,
    brand: "asus",
    rating: 1,
    category: "laptops",
    images: ["https://link-to-my-image"],
  },
  {
    title: "new product",
    price: 200,
    brand: "asus",
    rating: 2,
    category: "laptops",
    images: ["https://link-to-my-image"],
  },
  {
    title: "new product",
    price: 300,
    brand: "asus",
    rating: 3,
    category: "laptops",
    images: ["https://link-to-my-image"],
  },
];

describe("Filter products", () => {
  let page;

  beforeAll(() => {
    // NOTE: init products store before all tests
    productStore.init();
  });

  afterAll(() => {
    productStore.destroy();
  });

  beforeEach(() => {
    fetchMock.mockResponses(
      [JSON.stringify(categories), { status: 200 }],
      [JSON.stringify(brands), { status: 200 }],
      [
        JSON.stringify(products),
        {
          status: 200,
          headers: {
            "X-Total-Count": "100",
          },
        },
      ],
    );

    page = new HomePage();

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

  it("should apply category filter", () => {
    // TODO: put your awesome test here
  });

  it("should remove category filter", () => {
    // TODO: put your awesome test here
  });

  it("should apply brand filter", () => {
    // TODO: put your awesome test here
  });

  it("should remove brand filter", () => {
    // TODO: put your awesome test here
  });

  it("should remove all filters", () => {
    // TODO: put your awesome test here
  });
});
