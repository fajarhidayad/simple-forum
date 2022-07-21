import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";

export interface MyJWTPayload {
  id: number;
  username: string;
}

export const validateToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.PRIVATE_KEY as string,
    (err, decoded) => {
      if (err) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid Token, Please logout and then Sign in again",
        });
      }

      return decoded;
    }
  );
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const signToken = (payload: Object) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY as string);
};
