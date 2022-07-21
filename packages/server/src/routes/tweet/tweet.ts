import { prisma } from "../../db/prisma";
import { createTweetSchema } from "./schema";
import { createProtectedRouter } from "../../middleware/authMiddleware";

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
    resolve({ ctx }) {},
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
