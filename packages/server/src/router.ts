import { createRouter } from "./utils/context";
import posts from "./routes/post";

export const appRouter = createRouter().merge("post.", posts);
export type AppRouter = typeof appRouter;
