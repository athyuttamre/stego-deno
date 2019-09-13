import { Status } from "https://deno.land/std@v0.12.0/http/http_status.ts";
import { Response as ServerResponse } from "https://deno.land/std@v0.12.0/http/server.ts";

import { absurd } from "../lib/absurd.ts";

interface Body {
  type: "text";
  value: string;
}

function bodyToServerResponseBody(
  encoder: TextEncoder,
  body: Body
): Uint8Array {
  return encoder.encode(body.value);
}

export interface ResponseParams {
  status: Status;
  body?: Body;
}

export class Response {
  private _status: Status;
  private _body?: Body;
  private _encoder: TextEncoder;

  constructor(params: ResponseParams) {
    const { status, body } = params;
    this._status = status;
    this._body = body;
    this._encoder = new TextEncoder();
  }

  toServerResponse(): ServerResponse {
    const headers = new Headers();
    if (this._body) {
      headers.set("Content-Type", "text/plain");
    }

    return {
      status: this._status,
      headers: headers,
      body: this._body
        ? bodyToServerResponseBody(this._encoder, this._body)
        : undefined
    };
  }
}

export type ResponseLike = Status | string | ResponseParams | Response;

export function responseLikeToResponse(responseLike: ResponseLike): Response {
  if (typeof responseLike === "number") {
    return new Response({
      status: responseLike
    });
  } else if (typeof responseLike === "string") {
    return new Response({
      status: Status.OK,
      body: {
        type: "text",
        value: responseLike
      }
    });
  } else if (responseLike instanceof Response) {
    return responseLike;
  } else if (typeof responseLike === "object") {
    return new Response(responseLike);
  } else {
    return absurd(responseLike);
  }
}
