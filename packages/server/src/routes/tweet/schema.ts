import { z } from "zod";

export const createTweetSchema = z.object({
  text: z.string().max(255),
  user: z.string().max(255),
});
