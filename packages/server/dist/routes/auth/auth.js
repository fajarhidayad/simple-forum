"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../../utils/context");
const prisma_1 = require("../../db/prisma");
const hashPassword_1 = require("../../utils/hashPassword");
const server_1 = require("@trpc/server");
const jwt_1 = require("../../utils/jwt");
const schema_1 = require("./schema");
const authRouter = context_1.createRouter()
    .mutation("signIn", {
    input: schema_1.signInSchema,
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({
                where: { email: input.email },
            });
            if (!user) {
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: "Email not exist, maybe you want to sign up first",
                });
            }
            const password = yield hashPassword_1.comparePassword(input.password, user.password);
            if (!password) {
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: "Credentials not match",
                });
            }
            const token = jwt_1.signToken({ id: user.id, username: user.username });
            return {
                token,
            };
        });
    },
})
    .mutation("signUp", {
    input: schema_1.signUpSchema,
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield prisma_1.prisma.user.findFirst({
                where: { email: input.email },
            });
            const username = yield prisma_1.prisma.user.findFirst({
                where: { username: input.username },
            });
            if (email) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: "Email already used, maybe you wanna sign in instead.",
                });
            }
            if (username) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: "Username already taken",
                });
            }
            const hashed = yield hashPassword_1.hashPassword(input.password);
            const user = Object.assign(Object.assign({}, input), { password: hashed });
            const createdUser = yield prisma_1.prisma.user.create({ data: Object.assign({}, user) });
            const token = jwt_1.signToken({
                id: createdUser.id,
                username: createdUser.username,
            });
            return {
                token,
            };
        });
    },
});
exports.default = authRouter;
