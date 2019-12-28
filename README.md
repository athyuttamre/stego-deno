<img src=".github/stego.svg" width="80" alt="stego logo">

# Stego

Stego is a set of packages for writing web servers. It is written in TypeScript,
and targets the Deno runtime.

- `http` lets you run a server, listen to requests, and send responses.
- `router` lets you route requests based on URLs and set up middleware.

Each package contains an `examples` directory with examples that cover various use cases.

# Quickstart

After [installing Deno](https://deno.land/#install), create a new file and name
it `hello_world.ts`.

```ts
import { Server, Response } from "https://deno.land/x/stego/http/mod.ts";

const handler = async () => {
  return new Response({ body: "Hello, world." });
};

const server = new Server(handler);
server.listen(3000);
```

Then run your server:

```
deno --allow-net hello_world.ts
```

You will now have a Stego server running on `localhost:3000`.

# Docs

Coming soon. See various examples in `http/examples` and `router/examples` in
the meantime.

# License

MIT


