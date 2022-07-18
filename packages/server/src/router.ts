import { createRouter } from "./utils/context";
import posts from "./routes/post";
import auth from "./routes/auth";

export const appRouter = createRouter()
  .merge("post.", posts)
  .merge("auth.", auth);
export type AppRouter = typeof appRouter;
