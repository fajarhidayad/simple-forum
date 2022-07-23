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
const prisma_1 = require("../../db/prisma");
const zod_1 = require("zod");
const jwt_1 = require("../../utils/jwt");
const server_1 = require("@trpc/server");
const likeRouter = authMiddleware_1.createProtectedRouter()
    .query("getUserLike", {
    input: zod_1.z.object({
        username: zod_1.z.string().optional(),
    }),
    resolve({ ctx, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            if (!token && !input.username)
                throw new server_1.TRPCError({ code: "BAD_REQUEST" });
            if (input.username) {
                const user = yield prisma_1.prisma.user.findUnique({
                    where: { username: input.username },
                });
                if (!user)
                    throw new server_1.TRPCError({ code: "NOT_FOUND" });
                const likedTweets = yield prisma_1.prisma.likeTweet.findMany({
                    where: { userId: user.id },
                    include: { Tweet: true, User: true },
                });
                return likedTweets;
            }
            const { id: userId } = jwt_1.decodeToken(token);
            const likedTweet = yield prisma_1.prisma.likeTweet.findMany({
                where: { userId },
                include: { Tweet: true, User: true },
            });
            return likedTweet;
        });
    },
})
    .query("countLike", {
    input: zod_1.z.object({
        tweetId: zod_1.z.number(),
    }),
    resolve({ input, ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id: userId } = jwt_1.decodeToken(token);
            const countLike = yield prisma_1.prisma.likeTweet.count({
                where: { tweetId: input.tweetId, status: true },
            });
            const likedByUser = yield prisma_1.prisma.likeTweet.findFirst({
                where: { userId, tweetId: input.tweetId },
            });
            return {
                count: countLike,
                liked: likedByUser && likedByUser.status,
            };
        });
    },
})
    .mutation("likeTweet", {
    input: zod_1.z.object({
        tweetId: zod_1.z.number(),
    }),
    resolve({ input, ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id: userId } = jwt_1.decodeToken(token);
            const like = yield prisma_1.prisma.likeTweet.findFirst({
                where: { tweetId: input.tweetId, AND: { userId } },
            });
            if (like) {
                const status = like.status;
                return yield prisma_1.prisma.likeTweet.update({
                    data: { status: !status },
                    where: { id: like.id },
                });
            }
            return yield prisma_1.prisma.likeTweet.create({
                data: {
                    status: true,
                    tweetId: input.tweetId,
                    userId,
                },
            });
        });
    },
});
exports.default = likeRouter;
