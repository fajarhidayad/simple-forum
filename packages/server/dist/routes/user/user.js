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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const prisma_1 = require("../../db/prisma");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const jwt_1 = require("../../utils/jwt");
const excludeQuery_1 = __importDefault(require("../../utils/excludeQuery"));
const userRouter = authMiddleware_1.createProtectedRouter()
    .query("getInfo", {
    // Get User Auth by Token
    resolve({ ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield ctx.token;
            const { id } = jwt_1.decodeToken(token);
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            const userWithoutPass = excludeQuery_1.default(user, "password", "createdAt", "updatedAt");
            return {
                user: userWithoutPass,
            };
        });
    },
})
    .query("getUserProfile", {
    // get User Profile by Input ID
    input: zod_1.z.string(),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUniqueOrThrow({
                where: { username: input },
            });
            if (!user) {
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }
            const filtered = excludeQuery_1.default(user, "password", "createdAt", "updatedAt", "id", "email");
            return {
                user: filtered,
            };
        });
    },
});
exports.default = userRouter;
