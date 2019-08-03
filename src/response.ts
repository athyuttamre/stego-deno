import { Status } from "https://deno.land/std@v0.12.0/http/http_status.ts";
import { Response as ServerResponse } from "https://deno.land/std@v0.12.0/http/server.ts";

type Body = { type: "json"; value: object } | { type: "text"; value: string };

export type Response = {
  status: Status;
  headers?: Headers;
  body?: Body;
};

export type Responseable = string | Status | Response;

const encoder = new TextEncoder();

export const toServerResponseBody = (body?: Body): Uint8Array | void => {
  if (body === undefined) {
    return undefined;
  } else {
    return encoder.encode(JSON.stringify(body));
  }
};

export const toServerResponse = (
  responseable: Responseable
): ServerResponse => {
  switch (typeof responseable) {
    case "number":
      return {
        status: responseable
      };
    case "string":
      const headers = new Headers();
      headers.set("Content-Type", "text/plain");
      return {
        status: 200,
        headers: headers,
        body: encoder.encode(responseable)
      };
    default:
      const body = toServerResponseBody(responseable.body);
      return {
        status: responseable.status,
        headers: responseable.headers,
        ...(body ? { body } : {})
      };
  }
};
