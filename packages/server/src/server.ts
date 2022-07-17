import express, { Request, Response, NextFunction } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import { appRouter } from "./router";
import { createContext } from "./utils/context";

export type { AppRouter } from "./router";

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
