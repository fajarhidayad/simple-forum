import { createProtectedRouter } from "../../middleware/authMiddleware";
import { prisma } from "../../db/prisma";
import { z } from "zod";
import { decodeToken } from "../../utils/jwt";

const like = createProtectedRouter()
  .query("countLike", {
    input: z.object({
      tweetId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const countLike = await prisma.likeTweet.count({
        where: { tweetId: input.tweetId },
      });
      const likedByUser = await prisma.likeTweet.findFirst({
        where: { userId, tweetId: input.tweetId },
      });

      return {
        count: countLike,
        liked: likedByUser ? true : false,
      };
    },
  })
  .mutation("likeTweet", {
    input: z.object({
      tweetId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const like = await prisma.likeTweet.findFirst({
        where: { tweetId: input.tweetId, AND: { userId } },
      });

      if (like) {
        return await prisma.likeTweet.delete({ where: { id: like.id } });
      }

      return await prisma.likeTweet.create({
        data: {
          tweetId: input.tweetId,
          userId,
        },
      });
    },
  });

export default like;
