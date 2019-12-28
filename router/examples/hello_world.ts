import { Server, Response } from "../../http/mod.ts";
import { Router } from "../mod.ts";

const handler = async () => {
  return new Response({ body: "Hello, world." });
};

const router = new Router();
router.get("/", handler);

const server = new Server(router.handler);
server.listen(3000);
