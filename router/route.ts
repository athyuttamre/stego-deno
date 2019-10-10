import { Method, Request, Handler } from "../http/mod.ts";
import { Middleware, combineMiddleware } from "./middleware.ts";

interface RouteParams {
  method: Method;
  path: string;
  middlewares?: Middleware[];
  handler: Handler;
}

export class Route {
  private _method: Method;
  private _path: string;
  private _middlewares: Middleware[];
  private _handler: Handler;

  constructor(params: RouteParams) {
    const { method, path, middlewares, handler } = params;
    this._method = method;
    this._path = path;
    this._middlewares = middlewares || [];
    this._handler = handler;
  }

  get handler() {
    const combined = combineMiddleware(this._middlewares);
    return combined(this._handler);
  }

  matches(request: Request): boolean {
    // TODO
    return true;
  }
}
