import { ServerRequest } from "https://deno.land/std@v0.12.0/http/server.ts";

export class Request {
  private _serverRequest: ServerRequest;

  constructor(serverRequest: ServerRequest) {
    this._serverRequest = serverRequest;
  }
}
