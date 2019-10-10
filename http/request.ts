import { ServerRequest } from "https://deno.land/std@v0.20.0/http/server.ts";
import { Method, parseMethod } from "./request_method.ts";
import { RequestBody } from "./request_body.ts";

export type RequestParams = {
  method: Method;
  url: string; // TODO: accept URL?
  headers: Headers; // TODO: accept object?
  body: () => Promise<Uint8Array>; // TODO: accept string, object, other values?
};

export class Request {
  public method: Method;
  public url: URL; // TODO: expose just the values, not the raw object.
  public headers: Headers; // TODO: expose just the values, not the raw object.
  public body: RequestBody;

  constructor(params: RequestParams) {
    const { method, url, headers, body } = params;

    this.method = method;
    this.url = new URL(url);
    this.headers = headers;
    this.body = new RequestBody(body);
  }

  static async fromServerRequest(
    serverRequest: ServerRequest
  ): Promise<Request> {
    const method = parseMethod(serverRequest.method);
    // TODO: find origin from serverRequest
    const url = `http://localhost${serverRequest.url}`;
    const headers = serverRequest.headers;
    const body = async () => serverRequest.body();

    return new this({
      method,
      url,
      headers,
      body
    });
  }
}
