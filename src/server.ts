import { serve } from "https://deno.land/std@v0.12.0/http/server.ts";
import { Handler } from "./handler.ts";
import { toServerResponse } from "./response.ts";

export class Server {
  private _handler!: Handler;

  constructor(handler: Handler) {
    this._handler = handler;
  }

  listen = async (port: number, hostname: string = "localhost") => {
    const addr = `${hostname}:${port}`;
    const server = serve(addr);
    for await (const request of server) {
      const responseable = await this._handler(request);
      request.respond(toServerResponse(responseable));
    }
  };
}
