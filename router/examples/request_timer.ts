import { Server, Request, Response, Method, Handler } from "../../http/mod.ts";
import { Router, Route } from "../mod.ts";

function sleep(ms: number): Promise<void> {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

function requestTimer(next: Handler): Handler {
  return async (request: Request) => {
    const start = performance.now();
    const response = await next(request);
    const end = performance.now();
    console.log(`Request took ${end - start}ms to complete.`);

    return response;
  };
}

const router = new Router();
const route = new Route({
  method: Method.GET,
  path: "/",
  middlewares: [requestTimer],
  handler: async () => {
    await sleep(500);
    return new Response({ body: "Hello, world." });
  }
});
router.register(route);

const server = new Server(router.handler);
server.listen(3000);
