import { Handler } from "../core/mod.ts";
import { Middleware, combineMiddleware } from "./middleware.ts";

export type Method = "GET" | "POST";

interface RouteParams {
  url: string;
  method: Method;
  middlewares: Middleware[];
  handler: Handler;
}

export class Route {
  private _url: string;
  private _method: Method;
  private _middlewares: Middleware[];
  private _handler: Handler;

  constructor(params: RouteParams) {
    const { url, method, middlewares, handler } = params;
    this._url = url;
    this._method = method;
    this._middlewares = middlewares;
    this._handler = handler;
  }

  get handler() {
    // TODO: handler should assert that request matches the route
    const combined = combineMiddleware(this._middlewares);
    return combined(this._handler);
  }

  matches(request: Request): boolean {
    return false;
  }
}
