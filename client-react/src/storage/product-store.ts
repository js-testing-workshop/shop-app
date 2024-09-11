import LocalStorageService from "../services/local-storage/index.ts";
interface Product {
  id: string;
  brand: string;
  category: string;
  images: string[];
  price: number;
  rating: number;
  title: string;
  count?: number;
}

class ProductStore {
  abortController = new AbortController();
  storage = new LocalStorageService(localStorage);

  get(id = ""): Product {
    return this.storage.get(id) as Product;
  }

  add(product: Product) {
    if (typeof product.count === "undefined") {
      product.count = 1;
    }

    this.storage.add(product.id, product);

    document.dispatchEvent(
      new CustomEvent("added-to-cart", {
        detail: product.id,
        bubbles: true,
      }),
    );
  }

  remove(id = "") {
    this.storage.remove(id);

    document.dispatchEvent(
      new CustomEvent("removed-from-cart", {
        detail: id,
        bubbles: true,
      }),
    );
  }

  getAll() {
    return this.storage.getAll() ?? [];
  }

  removeAll() {
    const items = this.getAll();
  
    for (const item of Object.values(items)) {
      const product = item as Product;
      this.remove(product.id);
    }
  }

  getProductPrice(id = "") {
    const product: Product = this.get(id);

    if (product === null) return 0;

    return product.price * (product.count ?? 0);
  }

  getTotal() {
    let total = 0;
    const products = this.getAll();

    for (const product of Object.values(products) as Product[]) {
      total += product.price * (product.count ?? 0);
    }

    return total;
  }

  getProductCount(id = "") {
    const product = this.get(id);

    if (product === null) return 0;

    return product.count;
  }

  getProductsCount() {
    const products = this.getAll();
    let total = 0;

    for (const product of Object.values(products) as Product[]) {
      total += product.count ?? 0;
    }

    return total;
  }

  destroy() {
    this.abortController.abort();
    this.storage = new LocalStorageService(localStorage);
  }
}

const productStore = new ProductStore();

export default productStore;
