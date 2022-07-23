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
const prisma_1 = require("../../db/prisma");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const jwt_1 = require("../../utils/jwt");
const tweetRouter = authMiddleware_1.createProtectedRouter()
    .query("getAll", {
    resolve: () => __awaiter(void 0, void 0, void 0, function* () {
        const tweets = yield prisma_1.prisma.tweet.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                User: true,
            },
        });
        return tweets;
    }),
})
    .query("getUserTweet", {
    //get user tweet by username
    input: zod_1.z.string(),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({ where: { username: input } });
            if (!user) {
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }
            const userTweets = yield prisma_1.prisma.tweet.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
                include: { User: true },
            });
            return userTweets;
        });
    },
})
    .mutation("createTweet", {
    input: zod_1.z.string().max(255),
    resolve: ({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield ctx.token;
        const { id } = jwt_1.decodeToken(token);
        yield prisma_1.prisma.user.findUniqueOrThrow({
            where: { id },
        });
        return yield prisma_1.prisma.tweet.create({ data: { text: input, userId: id } });
    }),
});
exports.default = tweetRouter;
