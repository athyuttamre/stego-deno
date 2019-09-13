import { serve } from "https://deno.land/std@v0.12.0/http/server.ts";
import { Handler } from "./handler.ts";
import { Request } from "./request.ts";
import { responseLikeToResponse } from "./response.ts";

export class Server {
  private _handler: Handler;

  constructor(handler: Handler) {
    this._handler = handler;
  }

  listen = async (port: number, hostname: string = "localhost") => {
    const addr = `${hostname}:${port}`;
    const server = serve(addr);
    for await (const serverRequest of server) {
      const request = new Request(serverRequest);
      // This is kind of awkward. Will middleware have to convert responseLike to Response too?
      // If we drop responseLike, then users will have to create a new Response each time.
      // Maybe that's why other frameworks create the Response object up front for you.
      const responseLike = await this._handler(request);
      const response = responseLikeToResponse(responseLike);
      const serverResponse = response.toServerResponse();

      serverRequest.respond(serverResponse);
    }
  };
}
