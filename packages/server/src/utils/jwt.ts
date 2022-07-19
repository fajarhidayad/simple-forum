import jwt from "jsonwebtoken";

export const validateToken = (token: string) => {
  return jwt.verify(token, process.env.PRIVATE_KEY as string);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const signToken = (payload: Object) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY as string);
};
