import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  username: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(64),
});
