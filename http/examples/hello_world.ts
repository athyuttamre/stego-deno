import { Server, Response } from "../mod.ts";

const server = new Server(async () => {
  return new Response({ body: "Hello, world." });
});

server.listen(3000);
