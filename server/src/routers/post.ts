import { PrismaClient } from "@prisma/client";
import { createRouter } from "../context";
import { prisma } from "../db/prisma";

const posts = createRouter().query("getAll", {
  resolve: async () => {
    const posts = await prisma.post.findMany();
    return posts;
  },
});

export default posts;
