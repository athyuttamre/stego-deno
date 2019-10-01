import { Server, Request, Response } from "../mod.ts";

async function index(req: Request) {
  console.log(req);
  return new Response({
    body: req.body.value
  });
}

const server = new Server(index);
server.listen(3000);
