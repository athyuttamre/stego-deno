import { Method, Request } from "../http/mod.ts";
import { Handler } from "./handler.ts";
import { Match } from "./match.ts";

interface RouteParams {
  method: Method;
  path: string;
  handler: Handler;
}

export class Route {
  method: Method;
  path: string;
  handler: Handler;

  constructor(params: RouteParams) {
    const { method, path, handler } = params;
    this.method = method;
    this.path = path;
    this.handler = handler;
  }

  matches(request: Request): Match | null {
    if (request.url.pathname === this.path) {
      return {
        path: this.path,
        params: {}
      };
    }

    return null;
  }
}
