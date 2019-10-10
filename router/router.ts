import { Status, Request, Handler, Response } from "../http/mod.ts";
import { Route } from "./route.ts";

export class Router {
  routes: Route[] = [];

  get handler(): Handler {
    return async (request: Request) => {
      for (let route of this.routes) {
        if (route.matches(request)) {
          return route.handler(request);
        }
      }

      return new Response({
        status: Status.NotFound
      });
    };
  }

  register(route: Route) {
    this.routes.push(route);
  }
}
