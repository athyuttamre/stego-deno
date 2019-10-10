export enum Method {
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

export function parseMethod(method: string): Method {
  if (Method.hasOwnProperty(method)) {
    return Method[method as keyof typeof Method];
  }

  // TODO: handle gracefully.
  throw new Error(`Unknown method: ${method}`);
}
