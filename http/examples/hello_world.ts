import { Server, Response } from "../mod.ts";

const handler = async () => {
  return new Response({ body: "Hello, world." });
};

const server = new Server(handler);
server.listen(3000);
