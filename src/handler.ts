// import { Request } from "./request.ts";
import { ServerRequest as Request } from "https://deno.land/std@v0.12.0/http/server.ts";
import { Responseable } from "./response.ts";

export type Handler = (request: Request) => Promise<Responseable>;
