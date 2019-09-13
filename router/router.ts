import { Status, Request, Handler, Response } from "../core/mod.ts";
import { Route } from "./route.ts";

export class Router {
  routes: Route[];

  constructor() {
    this.routes = [];
  }

  get handler(): Handler {
    const handler = (request: Request) => {
      for (let route of this.routes) {
        if (route.matches(request)) {
          return route.handler(request);
        }
      }

      return new Response({
        status: Status.NotFound
      });
    };

    return handler;
  }

  register(route: Route) {
    this.routes.push(route);
  }
}
