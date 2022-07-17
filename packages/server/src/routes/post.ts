import { createRouter } from "../utils/context";
import { prisma } from "../db/prisma";

const posts = createRouter().query("getAll", {
  resolve: async () => {
    const posts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  },
});

export default posts;
