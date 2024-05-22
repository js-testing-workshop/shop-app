import { ProductI, QueryI } from "../../interfaces";
import Handler from "../basic-filter";

export default class PropsFilter extends Handler {
  filters = {
    category: (data: Array<ProductI>, query: QueryI) => {
      const { category } = query;

      if (category) {
        return data.filter((item) => category.includes(item.category));
      }

      return data;
    },
    brand: (data: Array<ProductI>, query: QueryI) => {
      const { brand } = query;

      if (brand) {
        return data.filter((item) => brand.includes(item.brand));
      }

      return data;
    },
    price: (data: Array<ProductI>, query: QueryI) => {
      const { price_lte, price_gte } = query;

      const min =
        typeof price_gte === "undefined" ? -Infinity : parseInt(price_gte, 10);
      const max =
        typeof price_lte === "undefined" ? Infinity : parseInt(price_lte, 10);

      const result = data.filter((item) => {
        return item.price >= min && item.price <= max;
      });

      return result;
    },
    rating: (data: Array<ProductI>, query: QueryI) => {
      const { rating_lte, rating_gte } = query;

      const min =
        typeof rating_gte === "undefined" ? -Infinity : parseFloat(rating_gte);
      const max =
        typeof rating_lte === "undefined" ? Infinity : parseFloat(rating_lte);

      const result = data.filter((item) => {
        return item.rating >= min && item.rating <= max;
      });

      return result;
    },
  };

  apply(data: Array<ProductI>, query: QueryI) {
    let result = [...data];

    for (const filter of Object.values(this.filters)) {
      const filterResult = filter(result, query);

      result = filterResult;
    }

    return this.next(result, query);
  }
}
