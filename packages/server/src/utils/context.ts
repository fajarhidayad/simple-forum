import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export async function createContext(
  opts?: trpcExpress.CreateExpressContextOptions
) {}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
