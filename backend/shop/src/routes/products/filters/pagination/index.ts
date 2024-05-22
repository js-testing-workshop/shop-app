import Handler from "../basic-filter";
import { ProductI, QueryI } from "../../interfaces";

export default class PaginationFilter extends Handler {
  apply(data: Array<ProductI>, query: QueryI) {
    const { _page, _limit } = query;

    if (_page && _limit) {
      const page = parseInt(_page, 10);
      const limit = parseInt(_limit, 10);

      const end = page * limit;
      const start = end - limit;

      const result = data.slice(start, end);

      if (result.length) {
        return this.next(result, query);
      }
    }

    return this.next(data, query);
  }
}
