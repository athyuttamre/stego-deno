import { Status } from "https://deno.land/std@v0.12.0/http/http_status.ts";
import { Response as ServerResponse } from "https://deno.land/std@v0.12.0/http/server.ts";
import {
  ResponseBody,
  contentTypeForResponseBody,
  encodeResponseBody
} from "./body.ts";

type ResponseParams = {
  status?: Status;
  headers?: { [header: string]: string };
  body?: ResponseBody;
};

export class Response {
  status: Status;
  headers: Headers;
  body: ResponseBody | null;

  constructor(params: ResponseParams) {
    const { status, headers, body } = params;

    // Set status
    this.status = status || Status.OK;

    // Set headers
    this.headers = new Headers();
    if (headers) {
      for (let header in headers) {
        this.headers.set(header, headers[header]);
      }
    }

    // Set body
    this.body = body || null;
    if (this.body && !this.headers.get("Content-Type")) {
      const contentType = contentTypeForResponseBody(this.body);
      if (contentType) {
        this.headers.set("Content-Type", contentType);
      }
    }
  }

  toServerResponse(): ServerResponse {
    return {
      status: this.status,
      headers: this.headers,
      body: this.body ? encodeResponseBody(this.body) : undefined
    };
  }
}
