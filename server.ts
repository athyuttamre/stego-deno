interface Request {
  method: "GET" | "POST";
}

interface Response {
  status: number;
}

interface Handler {
  (req: Request): Promise<number | string | Response>;
}

interface Server {
  handler: Handler;
  listen: () => Promise<void>;
}

export function createServer(handler: Handler): Server {
  return {
    handler,
    listen: function() {
      return Promise.resolve();
    }
  };
}
