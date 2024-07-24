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
    // TODO: mock appropriate requsts: categories and brands
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

  });

  it("should correctly create product", async () => {
    // Fill in all the form fields except the image

    // Hack for an image cration
    Object.defineProperty(image, "files", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: [file],
    });

    image.removeAttribute("required");

    // Submit the form

    // Hack: flush all promises
    await new Promise(process.nextTick);

    // Check results
  });

  it("should not crate a product when the data is invalid", () => {
    // TODO: ...
  });
});
