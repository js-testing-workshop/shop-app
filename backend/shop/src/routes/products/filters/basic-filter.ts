import { ProductI, QueryI } from "../interfaces";

interface HandlerInterface {
  setNext(handler: HandlerInterface): HandlerInterface;
  next(data?: any[], query?: Record<string, any>): any[];
  apply(data: any[], query: Record<string, any>): any[];
}

export default class Handler implements HandlerInterface {
  nextHandler;

  setNext(handler: HandlerInterface) {
    this.nextHandler = handler;

    return this.nextHandler;
  }

  next(data: Array<ProductI>, query: QueryI) {
    if (this.nextHandler) {
      return this.nextHandler.apply(data, query);
    }

    return data;
  }

  apply(data, query): any {
    // abstract
  }
}
