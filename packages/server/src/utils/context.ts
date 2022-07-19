import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export async function createContext(
  opts?: trpcExpress.CreateExpressContextOptions
) {
  async function getTokenFromHeader() {
    const token =
      opts && opts.req.headers.authorization
        ? opts.req.headers.authorization.split(" ")
        : null;

    return token ? token[1] : token;
  }

  const token = getTokenFromHeader();

  return {
    token,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
