const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

interface TextBody {
  type: "text";
  value: string;
  raw: Uint8Array;
}
interface JsonBody {
  type: "json";
  value: object;
  raw: Uint8Array;
}
interface FormBody {
  type: "form";
  value: { [name: string]: string };
  raw: Uint8Array;
}
interface OtherBody {
  type: "other";
  value: Uint8Array;
  raw: Uint8Array;
}

export type RequestBody = TextBody | JsonBody | FormBody | OtherBody;

export function decodeRequestBody(
  contentType: string | null,
  body: Uint8Array
): RequestBody {
  // TODO: handle empty bodies
  try {
    const str = textDecoder.decode(body);
    if (contentType === "text/plain") {
      return { type: "text", value: str, raw: body };
    } else if (contentType === "application/json") {
      return { type: "json", value: JSON.parse(str), raw: body };
    } else if (contentType === "application/x-www-form-urlencoded") {
      // TODO: decode form values
      return { type: "form", value: {}, raw: body };
    } else {
      return {
        type: "other",
        value: body,
        raw: body
      };
    }
  } catch {
    return {
      type: "other",
      value: body,
      raw: body
    };
  }
}

export type ResponseBody = string | object | Uint8Array;

export function contentTypeForResponseBody(body: ResponseBody): string | null {
  if (typeof body === "string") {
    return "text/plain";
  } else if (body instanceof Uint8Array) {
    return "application/json";
  } else {
    return null;
  }
}

export function encodeResponseBody(body: ResponseBody): Uint8Array {
  if (typeof body === "string") {
    return textEncoder.encode(body);
  } else if (body instanceof Uint8Array) {
    return body;
  } else {
    return textEncoder.encode(JSON.stringify(body));
  }
}
