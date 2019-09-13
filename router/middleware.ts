import { Handler } from "../core/handler.ts";

export type Middleware = (next: Handler) => Handler;

export function identityMiddleware(next: Handler) {
  return next;
}

export function combineMiddleware(middlewares: Middleware[]): Middleware {
  return middlewares.reduce((acc, current) => {
    const wrapper: Middleware = (handler: Handler) => {
      return acc(current(handler));
    };
    return wrapper;
  }, identityMiddleware);
}
