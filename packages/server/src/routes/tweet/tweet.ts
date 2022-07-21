import { prisma } from "../../db/prisma";
import { createTweetSchema } from "./schema";
import { createProtectedRouter } from "../../middleware/authMiddleware";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import exclude from "../../utils/excludeQuery";

const tweets = createProtectedRouter()
  .query("getAll", {
    resolve: async () => {
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
    input: createTweetSchema,
    resolve: async ({ input }) => {
      await prisma.user.findUniqueOrThrow({
        where: { id: input.userId },
      });

      return await prisma.tweet.create({ data: { ...input } });
    },
  });

export default tweets;
