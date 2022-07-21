import { TRPCError } from "@trpc/server";
import { createRouter } from "../utils/context";
import { validateToken } from "../utils/jwt";

export const createProtectedRouter = () => {
  return createRouter().middleware(async ({ ctx, next }) => {
    const token = await ctx.token;
    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Please login first to access the content.",
      });
    }

    validateToken(token);

    return next();
  });
};
