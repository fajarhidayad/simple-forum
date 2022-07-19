import { createRouter } from "../../utils/context";
import { prisma } from "../../db/prisma";
import { comparePassword, hashPassword } from "../../utils/hashPassword";
import { TRPCError } from "@trpc/server";
import { signToken } from "../../utils/jwt";
import { signInSchema, signUpSchema } from "./schema";

const auth = createRouter()
  .mutation("signIn", {
    input: signInSchema,
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

      const token = signToken({ id: user.id, username: user.username });

      return {
        token,
      };
    },
  })
  .mutation("signUp", {
    input: signUpSchema,
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

      const createdUser = await prisma.user.create({ data: { ...user } });

      const token = signToken({
        id: createdUser.id,
        username: createdUser.username,
      });

      return {
        token,
      };
    },
  });

export default auth;
