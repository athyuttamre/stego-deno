import { ServerRequest } from "https://deno.land/std@v0.12.0/http/server.ts";
import { RequestBody, decodeRequestBody } from "./body.ts";

enum Method {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE"
}

// TODO: use the general purpose validator framework when ready.
function parseMethod(method: string): Method {
  if (Method.hasOwnProperty(method)) {
    return Method[method as keyof typeof Method];
  }

  throw new Error(`Unknown method: ${method}`);
}

export class Request {
  public method: Method;
  public url: string;
  public headers: Headers;
  public body: RequestBody;

  // TODO: actually accept params.
  constructor() {
    this.method = Method.GET;
    this.url = "";
    this.headers = new Headers();
    this.body = decodeRequestBody("", new Uint8Array());
  }

  static async fromServerRequest(
    serverRequest: ServerRequest
  ): Promise<Request> {
    const response = new this();

    response.method = parseMethod(serverRequest.method);
    response.url = serverRequest.url;
    response.headers = serverRequest.headers;
    response.body = decodeRequestBody(
      response.headers.get("Content-Type"),
      await serverRequest.body()
    );

    return response;
  }
}
