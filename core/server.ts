import { Handler } from "./handler.ts";

export interface Server<C> {
  _handler: Handler<C>;
  listen: () => Promise<void>;
}

export function createServer<C>(handler: Handler<C>): Server<C> {
  return {
    _handler: handler,
    listen: function() {
      return Promise.resolve();
    }
  };
}

const server = createServer(async (req, ctx) => ({ status: 200 }));
