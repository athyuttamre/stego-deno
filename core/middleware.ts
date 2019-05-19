import { Request } from "./request.ts";
import { Response } from "./response.ts";
import { Context } from "./context.ts";
import { Handler } from "./handler.ts";

export interface Middleware<C extends Context, E> {
  (request: Request, context: C, next: Handler<C & E>): Promise<Response>;
}

const combineMiddleware = <C extends Context, E>(
  // How to type all these different generics correctly?
  // What I really want is: combineMiddleware takes an array of middleware with
  // each having an extension type E[n], and I want to return C & E[1] & ... & E[n].
  middlewares: Array<Middleware<C, unknown>>
): Middleware<C, E> => {
  if (middlewares.length === 1) {
    return middlewares[0];
  } else {
    const [current, ...restArray] = middlewares;
    const rest = combineMiddleware(restArray);
    return (request, context, next) => {
      return current(request, context, (nextRequest, nextContext) =>
        rest(nextRequest, nextContext, next)
      );
    };
  }
};
