import { createRouter } from "./utils/context";
import tweet from "./routes/tweet";
import auth from "./routes/auth";
import user from "./routes/user";
import comment from "./routes/comment/comment";
import like from "./routes/like/like";

export const appRouter = createRouter()
  .merge("tweet.", tweet)
  .merge("auth.", auth)
  .merge("user.", user)
  .merge("comment.", comment)
  .merge("like.", like);
export type AppRouter = typeof appRouter;
