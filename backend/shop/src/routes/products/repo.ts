import { db } from "common";
import { SearchFilter, PropsFilter, PaginationFilter } from "./filters";
import { ProductI } from "./interfaces";

class ProductsRepo {
  async getData(query: any) {
    const products = await db.read("products");
    const filtersChain = new SearchFilter();

    filtersChain.setNext(new PropsFilter());

    const filteredData = filtersChain.apply(products, query);
    const totalCount = filteredData.length;

    filtersChain.setNext(new PaginationFilter());

    const result = filtersChain.apply(filteredData, query);

    return {
      products: result,
      totalCount,
    };
  }

  async createProduct(data: ProductI) {
    const result = await db.write("products", data);

    return result;
  }
}

const productsRepo = new ProductsRepo();

export default productsRepo;
