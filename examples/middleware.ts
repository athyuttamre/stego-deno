import { Context } from "../core/context.ts";
import { Middleware } from "../core/middleware.ts";

type Extension = { user: string };
const setUser: Middleware<Context, Extension> = async (
  request,
  context,
  next
) => {
  const contextWithUser = { ...context, user: "user_123" };
  return await next(request, contextWithUser);
};

export default setUser;
