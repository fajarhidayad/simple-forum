import { PrismaClient } from "@prisma/client";
import { createRouter } from "../context";

const posts = createRouter().query("getAll", {
  resolve: async () => {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
    return posts;
  },
});

export default posts;
