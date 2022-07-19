import { createRouter } from "./utils/context";
import tweet from "./routes/tweet";
import auth from "./routes/auth";
import user from "./routes/user";

export const appRouter = createRouter()
  .merge("tweet.", tweet)
  .merge("auth.", auth)
  .merge("user.", user);
export type AppRouter = typeof appRouter;
