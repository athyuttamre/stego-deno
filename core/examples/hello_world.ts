import { Server } from "../mod.ts";

const server = new Server(async () => {
  return "Hello, world.";
});

server.listen(8080);
