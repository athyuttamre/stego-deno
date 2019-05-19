import { Middleware } from "../core/middleware.ts";

type Extension = { user: string };
const setUser: Middleware<Extension> = async (request, context, next) => {
  const contextWithUser = { ...context, user: "user_123" };
  return await next(request, contextWithUser);
};

export default setUser;
