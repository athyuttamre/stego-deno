import { serve } from "https://deno.land/std@v0.20.0/http/server.ts";
import {
  Status,
  STATUS_TEXT
} from "https://deno.land/std@v0.20.0/http/http_status.ts";
import { Handler } from "./handler.ts";
import { Request } from "./request.ts";
import { encodeResponseBody } from "./response_body.ts";

export class Server {
  private _handler: Handler;

  // TODO: reconsider params.
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
      // TODO: handle unhandled promise rejections.
      try {
        const request = await Request.fromServerRequest(serverRequest);
        const response = await this._handler(request);
        const serverResponse = response.toServerResponse();
        await serverRequest.respond(serverResponse);
      } catch (e) {
        serverRequest.respond({
          status: Status.InternalServerError,
          body: encodeResponseBody(STATUS_TEXT.get(
            Status.InternalServerError
          ) as string)
        });
      }
    }
  }
}
