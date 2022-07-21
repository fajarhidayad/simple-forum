import { prisma } from "../../db/prisma";
import { createProtectedRouter } from "../../middleware/authMiddleware";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { validateToken } from "../../utils/jwt";
import { MyJWTPayload } from "../../utils/jwt";

const tweets = createProtectedRouter()
  .query("getAll", {
    resolve: async ({ ctx }) => {
      const token = await ctx.token;
      validateToken(token as string);

      const tweets = await prisma.tweet.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      });
      return tweets;
    },
  })
  .query("getUserTweet", {
    //get user tweet by username
    input: z.string(),
    async resolve({ input }) {
      const user = await prisma.user.findUnique({ where: { username: input } });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const userTweets = await prisma.tweet.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: { user: true },
      });

      return userTweets;
    },
  })
  .mutation("createTweet", {
    input: z.string().max(255),
    resolve: async ({ input, ctx }) => {
      const token = await ctx.token;
      const decoded = validateToken(token as string) as unknown;
      const { id } = decoded as MyJWTPayload;

      await prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return await prisma.tweet.create({ data: { text: input, userId: id } });
    },
  });

export default tweets;
