<img src=".github/stego.svg" width="80" alt="stego logo">

# Stego

Stego is a web toolkit for Deno. It provides the following packages:

- `http` lets you run a server, listen to requests, and send responses.
- `router` lets you route requests based on URLs and set up middleware.

Each package contains an `examples` directory with examples that cover various use cases.

You can use one or all of the packages, or mix and match some of them.


# Quickstart

```ts
// hello_world.ts
import { Server, Response } from "https://deno.land/x/stego/http/mod.ts";

const server = new Server(async () => {
  return new Response({ body: 'Hello, world.' });
});

server.listen(3000);
```

```
deno --allow-net hello_world.ts
```


# Guide

Stego is a set of packages that help you build web servers. It aims to be simple, well typed, and modular.

## Creating a server

## Requests and responses

## Error handling

## Routing

## Middleware

## Testing


# API Reference

## **`http`**

### `Server`

### `Handler`

### `Request`

### `Response`

## **`router`**

### `Router`

### `Route`

### `Middleware`

