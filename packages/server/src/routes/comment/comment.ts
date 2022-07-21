import { createProtectedRouter } from "../../middleware/authMiddleware";
import { z } from "zod";
import { decodeToken } from "../../utils/jwt";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../db/prisma";

const comment = createProtectedRouter()
  .query("getCommentByTweet", {
    input: z.number(),
    async resolve({ input }) {
      const count = await prisma.comment.count({ where: { tweetId: input } });
      const comments = await prisma.comment.findMany({
        where: { tweetId: input },
        include: {
          user: true,
        },
        take: 2,
      });

      return {
        comments,
        count,
      };
    },
  })
  .mutation("createComment", {
    input: z.object({
      tweetId: z.number(),
      comment: z.string().max(255),
    }),
    async resolve({ input, ctx }) {
      const token = await ctx.token;
      const { id: userId } = decodeToken(token!) as { id: number };

      const tweet = await prisma.tweet.findUniqueOrThrow({
        where: { id: input.tweetId },
      });
      if (!tweet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tweet not found",
        });
      }

      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must login first to comment",
        });
      }

      return await prisma.comment.create({
        data: {
          text: input.comment,
          tweetId: input.tweetId,
          userId: user.id,
        },
      });
    },
  });

export default comment;
