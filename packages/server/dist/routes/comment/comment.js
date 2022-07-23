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
const authMiddleware_1 = require("../../middleware/authMiddleware");
const zod_1 = require("zod");
const jwt_1 = require("../../utils/jwt");
const server_1 = require("@trpc/server");
const prisma_1 = require("../../db/prisma");
const commentRouter = authMiddleware_1.createProtectedRouter()
    .query("getCommentByTweet", {
    input: zod_1.z.number(),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_1.prisma.comment.count({ where: { tweetId: input } });
            const comments = yield prisma_1.prisma.comment.findMany({
                where: { tweetId: input },
                include: {
                    User: true,
                },
                take: 2,
            });
            return {
                comments,
                count,
            };
        });
    },
})
    .mutation("createComment", {
    input: zod_1.z.object({
        tweetId: zod_1.z.number(),
        comment: zod_1.z.string().max(255),
    }),
    resolve({ input, ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id: userId } = jwt_1.decodeToken(token);
            const tweet = yield prisma_1.prisma.tweet.findUniqueOrThrow({
                where: { id: input.tweetId },
            });
            if (!tweet) {
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: "Tweet not found",
                });
            }
            const user = yield prisma_1.prisma.user.findUniqueOrThrow({
                where: { id: userId },
            });
            if (!user) {
                throw new server_1.TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You must login first to comment",
                });
            }
            return yield prisma_1.prisma.comment.create({
                data: {
                    text: input.comment,
                    tweetId: input.tweetId,
                    userId: user.id,
                },
            });
        });
    },
});
exports.default = commentRouter;
