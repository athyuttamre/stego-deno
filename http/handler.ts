import { Request } from "./request.ts";
import { Response } from "./response.ts";

export type Handler = (request: Request) => Promise<Response>;
