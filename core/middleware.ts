import { Request } from "./request.ts";
import { Response } from "./response.ts";
import { Context } from "./context.ts";
import { Handler } from "./handler.ts";

export interface Middleware<ContextExtension> {
  (
    req: Request,
    context: Context,
    next: Handler<Context & ContextExtension>
  ): Promise<Response>;
}
