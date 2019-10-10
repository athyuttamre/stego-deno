import { Json } from "../lib/json.ts";

export type ResponseBody = string | Json | Uint8Array;

export function contentTypeForResponseBody(body: ResponseBody): string {
  if (typeof body === "string") {
    return "text/plain";
  } else if (body instanceof Uint8Array) {
    return "application/octet-stream";
  } else {
    return "application/json";
  }
}

const textEncoder = new TextEncoder();

export function encodeResponseBody(body: ResponseBody): Uint8Array {
  if (typeof body === "string") {
    return textEncoder.encode(body);
  } else if (body instanceof Uint8Array) {
    return body;
  } else {
    // TODO: handle errors
    return textEncoder.encode(JSON.stringify(body));
  }
}
