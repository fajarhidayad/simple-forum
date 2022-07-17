import express, { Request, Response, NextFunction } from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import cors from "cors";
import "dotenv/config";
import { createRouter, createContext } from "./context";
import posts from "./routers/post";

const appRouter = createRouter().merge("post.", posts);
export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("The API of a Simple Forum");
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.NODE_PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
