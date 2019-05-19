import { Request } from "./request.ts";
import { Response } from "./response.ts";
import { Context } from "./context.ts";

export interface Handler<C extends Context> {
  (req: Request, context: C): Promise<Response>;
}
