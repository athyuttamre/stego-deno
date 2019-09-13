import { Server, Handler, Request } from "../../core/mod.ts";
import { Middleware } from "../mod.ts";

const requestTimer: Middleware = next => {
  const handler = (request: Request) => {
    const start = Date.now();
    const response = next(request);
    const end = Date.now();
    console.log(`Request took ${start - end}ms to complete.`);

    return response;
  };

  return handler;
};

const router = new Router();

const server = new Server(async () => {
  return "Hello, world.";
});

server.listen(8080);
