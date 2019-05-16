// @ts-ignore TS does not allow .ts extensions.
import { createServer } from "../../server.ts";

async function index() {
  return "Hello, world.";
}

const server = createServer(index);
server.listen().then(() => {
  console.log(`Welcome to stego! 🎉`);
});
