import { Query } from "express-serve-static-core";

export default interface TypedRequest<T extends Query, U>
  extends Express.Request {
  query: T;
  body: U;
}
