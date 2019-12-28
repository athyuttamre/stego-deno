import { Server, Response } from "../../http/mod.ts";
import { Router, Middleware, Match } from "../mod.ts";
import { sleep } from "./lib.ts";

const timerMiddleware: Middleware = next => {
  return async (...args) => {
    const start = performance.now();
    const response = await next(...args);
    const end = performance.now();
    console.log(`Request took ${end - start}ms to complete.`);

    return response;
  };
};

const handler = async () => {
  await sleep(500);
  return new Response({ body: "Hello, world." });
};

const router = new Router();
router.get("/", timerMiddleware(handler));

const server = new Server(router.handler);
server.listen(3000);
