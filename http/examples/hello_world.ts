import { Server, Response } from "../mod.ts";

const server = new Server(async request => {
  const body = await request.body.json();
  return new Response({ body });
});

server.listen(3000);
