import { createRouter } from "../utils/context";
import { prisma } from "../db/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { TRPCError } from "@trpc/server";

const auth = createRouter()
  .mutation("signIn", {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email not exist, maybe you want to sign up first",
        });
      }

      const password = await comparePassword(input.password, user.password);
      if (!password) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Credentials not match",
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.PRIVATE_KEY as string
      );

      return {
        email: user.email,
        token,
      };
    },
  })
  .mutation("signUp", {
    input: z.object({
      firstName: z.string().min(3).max(50),
      lastName: z.string().min(3).max(50),
      username: z.string().min(3).max(100),
      email: z.string().email(),
      password: z.string().min(8).max(64),
    }),
    async resolve({ input }) {
      const email = await prisma.user.findFirst({
        where: { email: input.email },
      });
      const username = await prisma.user.findFirst({
        where: { username: input.username },
      });

      if (email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already used, maybe you wanna sign in instead.",
        });
      }
      if (username) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      const hashed = await hashPassword(input.password);
      const user = {
        ...input,
        username: "@" + input.username,
        password: hashed,
      };

      await prisma.user.create({ data: { ...user } });

      const token = jwt.sign(
        { email: input.email },
        process.env.PRIVATE_KEY as string
      );

      return {
        email: input.email,
        token,
      };
    },
  });

export default auth;
