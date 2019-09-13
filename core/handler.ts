import { Request } from "./request.ts";
import { ResponseLike } from "./response.ts";

export type Handler = (request: Request) => Promise<ResponseLike>;
