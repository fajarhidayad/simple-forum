import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("The API of a Simple Forum");
});

const port = process.env.NODE_PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
