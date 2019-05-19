import { createServer } from "../core/server.ts";

const index = async () => {
  // TODO: Response accepting extra field :(
  return { status: 200, message: "Hello, world." };
};

const server = createServer(index);
server.listen().then(() => {
  // TODO: import deno libs globally
  console.log(`Welcome to stego! 🎉`);
});
