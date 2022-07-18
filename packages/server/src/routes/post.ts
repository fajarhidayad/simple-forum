import { createRouter } from "../utils/context";
import { prisma } from "../db/prisma";
import { z } from "zod";

const posts = createRouter()
  .query("getAll", {
    resolve: async () => {
      const posts = await prisma.post.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });
      return posts;
    },
  })
  .mutation("createPost", {
    input: z.object({
      content: z.string().max(255),
      user: z.string().max(255),
    }),
    resolve: async ({ input }) => {
      return await prisma.post.create({ data: { ...input } });
    },
  });

export default posts;
