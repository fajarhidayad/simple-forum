import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/prisma";
import { createProtectedRouter } from "../../middleware/authMiddleware";
import { decodeToken } from "../../utils/jwt";
import exclude from "../../utils/excludeQuery";

const user = createProtectedRouter()
  .query("getInfo", {
    // Get User Auth by Token
    async resolve({ ctx }) {
      const token = await ctx.token;
      const { id } = decodeToken(token!) as { id: number };

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      const userWithoutPass = exclude(
        user!,
        "password",
        "createdAt",
        "updatedAt"
      );

      return {
        user: userWithoutPass,
      };
    },
  })
  .query("getUserProfile", {
    // get User Profile by Input ID
    input: z.string(),
    async resolve({ input }) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { username: input },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const filtered = exclude(
        user,
        "password",
        "createdAt",
        "updatedAt",
        "id",
        "email"
      );

      return {
        user: filtered,
      };
    },
  });

export default user;
