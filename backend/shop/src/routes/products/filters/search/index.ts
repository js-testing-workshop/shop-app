import { ProductI, QueryI } from "../../interfaces";
import Handler from "../basic-filter";

export default class SearchFilter extends Handler {
  apply(data: Array<ProductI>, query: QueryI) {
    const { q } = query;

    if (q) {
      const result = data.filter((item) => item.title.includes(q));

      return this.next(result, query);
    }

    return this.next(data, query);
  }
}
