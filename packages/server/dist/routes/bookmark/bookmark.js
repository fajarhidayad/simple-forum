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
const zod_1 = require("zod");
const prisma_1 = require("../../db/prisma");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const jwt_1 = require("../../utils/jwt");
const bookmarkRouter = authMiddleware_1.createProtectedRouter()
    .query("countSaved", {
    input: zod_1.z.object({
        tweetId: zod_1.z.number(),
    }),
    resolve({ input, ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id: userId } = jwt_1.decodeToken(token);
            const savedByUser = yield prisma_1.prisma.bookmark.findFirst({
                where: { userId },
            });
            const countResult = yield prisma_1.prisma.bookmark.count({
                where: { tweetId: input.tweetId },
            });
            return {
                count: countResult,
                saved: savedByUser,
            };
        });
    },
})
    .query("getSavedTweets", {
    resolve({ ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id: userId } = jwt_1.decodeToken(token);
            const tweets = yield prisma_1.prisma.bookmark.findMany({
                where: { userId },
                include: { Tweet: true, User: true },
            });
            return tweets;
        });
    },
})
    .mutation("saveTweet", {
    input: zod_1.z.object({
        tweetId: zod_1.z.number(),
    }),
    resolve({ ctx, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id: userId } = jwt_1.decodeToken(token);
            const isSaved = yield prisma_1.prisma.bookmark.findFirst({
                where: { tweetId: input.tweetId, AND: { userId } },
            });
            if (isSaved) {
                return yield prisma_1.prisma.bookmark.delete({ where: { id: isSaved.id } });
            }
            const bookmark = yield prisma_1.prisma.bookmark.create({
                data: {
                    tweetId: input.tweetId,
                    userId,
                },
            });
            return bookmark;
        });
    },
});
exports.default = bookmarkRouter;
