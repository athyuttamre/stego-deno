import {
  Status,
  Request,
  Response,
  Handler as HttpHandler,
  Method
} from "../http/mod.ts";
import { Route } from "./route.ts";
import { Handler } from "./handler.ts";

export class Router {
  routes: Route[] = [];

  get handler(): HttpHandler {
    return async (request: Request) => {
      for (let route of this.routes) {
        const match = route.matches(request);
        if (match) {
          return route.handler(request, match);
        }
      }

      return new Response({
        status: Status.NotFound
      });
    };
  }

  register(route: Route): void {
    this.routes.push(route);
  }

  connect = this._registerForMethod(Method.CONNECT);
  delete = this._registerForMethod(Method.DELETE);
  get = this._registerForMethod(Method.GET);
  head = this._registerForMethod(Method.HEAD);
  patch = this._registerForMethod(Method.PATCH);
  post = this._registerForMethod(Method.POST);
  put = this._registerForMethod(Method.PUT);
  trace = this._registerForMethod(Method.TRACE);

  private _registerForMethod(
    method: Method
  ): (path: string, handler: Handler) => Route {
    return (path, handler) => {
      const route = new Route({
        method: method,
        path,
        handler
      });
      this.register(route);
      return route;
    };
  }
}
