import { serve } from "https://deno.land/std@v0.12.0/http/server.ts";
import { Handler } from "./handler.ts";
import { Request } from "./request.ts";

export class Server {
  private _handler: Handler;

  constructor(handler: Handler) {
    this._handler = handler;
  }

  public async listen(
    port: number,
    hostname: string = "localhost"
  ): Promise<void> {
    const addr = `${hostname}:${port}`;
    const server = serve(addr);
    for await (const serverRequest of server) {
      const request = await Request.fromServerRequest(serverRequest);
      const response = await this._handler(request);
      const serverResponse = response.toServerResponse();

      await serverRequest.respond(serverResponse);
    }
  }
}
