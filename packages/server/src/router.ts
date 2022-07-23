import { createRouter } from "./utils/context";
import tweetRouter from "./routes/tweet";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import commentRouter from "./routes/comment/comment";
import likeRouter from "./routes/like/like";
import bookmarkRouter from "./routes/bookmark/bookmark";

export const appRouter = createRouter()
  .merge("tweet.", tweetRouter)
  .merge("auth.", authRouter)
  .merge("user.", userRouter)
  .merge("comment.", commentRouter)
  .merge("like.", likeRouter)
  .merge("bookmark.", bookmarkRouter);
export type AppRouter = typeof appRouter;
