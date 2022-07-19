import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hashPassword";

const seedUser = async () => {
  const prisma = new PrismaClient();

  const password = await hashPassword("obiwankenobi");
  await prisma.user.create({
    data: {
      email: "obiwan@mail.com",
      firstName: "Obi Wan",
      lastName: "Kenobi",
      password,
      username: "@kenobi",
    },
  });

  console.log("Sucessfully seed user!");
};

seedUser();
