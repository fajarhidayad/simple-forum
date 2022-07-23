"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.decodeToken = exports.validateToken = void 0;
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            throw new server_1.TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid Token, Please logout and then Sign in again",
            });
        }
        return decoded;
    });
};
exports.validateToken = validateToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
exports.decodeToken = decodeToken;
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_KEY);
};
exports.signToken = signToken;
