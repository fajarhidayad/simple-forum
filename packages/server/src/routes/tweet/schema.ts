import { z } from "zod";

export const createTweetSchema = z.object({
  text: z.string().max(255),
  userId: z.number(),
});
