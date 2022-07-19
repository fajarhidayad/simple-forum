import { prisma } from "../../db/prisma";
import { createProtectedRouter } from "../../middleware/authMiddleware";
import { decodeToken } from "../../utils/jwt";

function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

const user = createProtectedRouter().query("getInfo", {
  async resolve({ ctx }) {
    const token = await ctx.token;
    const { id } = decodeToken(token!) as { id: number };

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    const userWithoutPass = exclude(
      user!,
      "password",
      "createdAt",
      "updatedAt"
    );

    return {
      user: userWithoutPass,
    };
  },
});

export default user;
