import { z } from "zod";
import { prisma } from "../../db/prisma";
import { createProtectedRouter } from "../../middleware/authMiddleware";
import { decodeToken } from "../../utils/jwt";

const bookmarkRouter = createProtectedRouter()
  .query("countSaved", {
    input: z.object({
      tweetId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const savedByUser = await prisma.bookmark.findFirst({
        where: { userId },
      });
      const countResult = await prisma.bookmark.count({
        where: { tweetId: input.tweetId },
      });

      return {
        count: countResult,
        saved: savedByUser,
      };
    },
  })
  .query("getSavedTweets", {
    async resolve({ ctx }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const tweets = await prisma.bookmark.findMany({
        where: { userId },
        include: { Tweet: true, User: true },
      });

      return tweets;
    },
  })
  .mutation("saveTweet", {
    input: z.object({
      tweetId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const isSaved = await prisma.bookmark.findFirst({
        where: { tweetId: input.tweetId, AND: { userId } },
      });

      if (isSaved) {
        return await prisma.bookmark.delete({ where: { id: isSaved.id } });
      }

      const bookmark = await prisma.bookmark.create({
        data: {
          tweetId: input.tweetId,
          userId,
        },
      });

      return bookmark;
    },
  });

export default bookmarkRouter;
