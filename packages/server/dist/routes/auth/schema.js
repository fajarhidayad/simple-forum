"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = void 0;
const zod_1 = require("zod");
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.signUpSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(50),
    lastName: zod_1.z.string().min(3).max(50),
    username: zod_1.z.string().min(3).max(100),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(64),
});
