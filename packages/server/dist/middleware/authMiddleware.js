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
exports.createProtectedRouter = void 0;
const server_1 = require("@trpc/server");
const context_1 = require("../utils/context");
const jwt_1 = require("../utils/jwt");
const createProtectedRouter = () => {
    return context_1.createRouter().middleware(({ ctx, next }) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield ctx.token;
        if (!token) {
            throw new server_1.TRPCError({
                code: "UNAUTHORIZED",
                message: "Please login first to access the content.",
            });
        }
        jwt_1.validateToken(token);
        return next();
    }));
};
exports.createProtectedRouter = createProtectedRouter;
