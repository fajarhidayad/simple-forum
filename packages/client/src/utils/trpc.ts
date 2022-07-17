import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "simple-fun-forum-api";

export const trpc = createReactQueryHooks<AppRouter>();
