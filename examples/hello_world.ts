import { Server } from "../src/server.ts";

const server = new Server(async () => {
  return "Hello, world.";
});

server.listen(8080);
