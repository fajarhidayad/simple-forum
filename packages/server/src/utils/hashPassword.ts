import bcrypt from "bcryptjs";

export const hashPassword = async (s: string) => {
  const salt = bcrypt.genSaltSync(10);
  return await bcrypt.hash(s, salt);
};

export const comparePassword = async (current: string, hashed: string) => {
  return await bcrypt.compare(current, hashed);
};
