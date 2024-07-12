import Card from "./index.js";
import { products } from "../../fixtures/products.js";

describe("Card component", () => {
  let card;

  beforeEach(() => {
    card = new Card(products[0]);

    document.body.append(card.element);
  });

  afterEach(() => {
    card.destroy();
    card = null;
    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    // TODO: put your awesome test here
  });

  it("should render data correctly", () => {
    // TODO: put your awesome test here
  });

  it("should have ability to be destroyed", () => {
    // TODO: put your awesome test here
  });

  it("should dispatch 'add-to-cart' event", () => {
    // TODO: put your awesome test here
  });

  // TODO: add your other tests cases here...
});
