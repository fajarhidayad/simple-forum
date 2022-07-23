import { createProtectedRouter } from "../../middleware/authMiddleware";
import { prisma } from "../../db/prisma";
import { z } from "zod";
import { decodeToken } from "../../utils/jwt";
import { TRPCError } from "@trpc/server";

const likeRouter = createProtectedRouter()
  .query("getUserLike", {
    input: z.object({
      username: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const token = await ctx.token;
      if (!token && !input.username)
        throw new TRPCError({ code: "BAD_REQUEST" });

      if (input.username) {
        const user = await prisma.user.findUnique({
          where: { username: input.username },
        });
        if (!user) throw new TRPCError({ code: "NOT_FOUND" });

        const likedTweets = await prisma.likeTweet.findMany({
          where: { userId: user.id },
          include: { Tweet: true, User: true },
        });

        return likedTweets;
      }

      const { id: userId } = decodeToken(token!) as { id: number };

      const likedTweet = await prisma.likeTweet.findMany({
        where: { userId },
        include: { Tweet: true, User: true },
      });
      return likedTweet;
    },
  })
  .query("countLike", {
    input: z.object({
      tweetId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const countLike = await prisma.likeTweet.count({
        where: { tweetId: input.tweetId, status: true },
      });
      const likedByUser = await prisma.likeTweet.findFirst({
        where: { userId, tweetId: input.tweetId },
      });

      return {
        count: countLike,
        liked: likedByUser && likedByUser.status,
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
        const status = like.status;
        return await prisma.likeTweet.update({
          data: { status: !status },
          where: { id: like.id },
        });
      }

      return await prisma.likeTweet.create({
        data: {
          status: true,
          tweetId: input.tweetId,
          userId,
        },
      });
    },
  });

export default likeRouter;
