import {
  Status,
  STATUS_TEXT
} from "https://deno.land/std@v0.20.0/http/http_status.ts";
import { Response as ServerResponse } from "https://deno.land/std@v0.20.0/http/server.ts";
import {
  ResponseBody,
  contentTypeForResponseBody,
  encodeResponseBody
} from "./response_body.ts";

type ResponseParams = {
  status?: Status;
  headers?: Headers; // TODO: accept object?
  body?: ResponseBody;
};

export class Response {
  status: Status;
  headers: Headers;
  body: ResponseBody;

  constructor(params?: ResponseParams) {
    const { status, headers, body } = params || {};

    this.status = status || Status.OK;
    this.headers = headers || new Headers();
    // TODO: no way to pass an empty body?
    this.body = body || (STATUS_TEXT.get(this.status) as string);

    if (this.body && !this.headers.get("content-type")) {
      this.headers.set("content-type", contentTypeForResponseBody(this.body));
    }
  }

  toServerResponse(): ServerResponse {
    return {
      status: this.status,
      headers: this.headers,
      body: this.body === undefined ? undefined : encodeResponseBody(this.body)
    };
  }
}
