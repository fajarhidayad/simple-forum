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
const client_1 = require("@prisma/client");
const hashPassword_1 = require("../utils/hashPassword");
const seedUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const password = yield hashPassword_1.hashPassword("obiwankenobi");
    yield prisma.user.create({
        data: {
            email: "obiwan@mail.com",
            firstName: "Obi Wan",
            lastName: "Kenobi",
            password,
            username: "@kenobi",
        },
    });
    console.log("Sucessfully seed user!");
});
seedUser();
