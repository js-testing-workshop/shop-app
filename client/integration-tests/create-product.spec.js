import CreateProductPage from "../src/pages/create-product/index.js";

const categories = ["Monitors", "Laptops", "Video cards"];
const brands = ["Asus", "Acer", "Apple"];
const image = {
  data: {
    link: "link to my image",
  },
};
const product = {
  title: "new product",
  price: 100,
  brand: "asus",
  rating: 1,
  category: "laptops",
  images: ["https://link-to-my-image"],
};

const file = new File(["my super content"], "example.png", {
  type: "image/png",
});

describe("Create product", () => {
  let page;

  beforeEach(() => {
    // TODO: mock appropriate responses
    fetchMock.mockResponses();

    page = new CreateProductPage();

    document.body.append(page.element);
  });

  afterEach(() => {
    fetchMock.resetMocks();
    page.destroy();
    page = null;
    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(page.element).toBeInTheDocument();
    expect(page.element).toBeVisible();
  });

  it("should render page title", () => {
    // TODO: put your awesome test here
  });

  it("should correctly create product", async () => {
    // TODO: put your awesome test here
    // NOTE: you can remove "required" attribute from image input
  });

  it("should have ability to be destroyed", () => {
    // TODO: put your awesome test here
  });

  // TODO: add your test cases here...
});
