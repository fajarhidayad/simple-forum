"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const router_1 = require("./router");
const context_1 = require("./utils/context");
const app = express_1.default();
app.use(cors_1.default());
app.get("/", (req, res) => {
    res.send("The API of a Simple Forum");
});
app.use("/api/trpc", trpcExpress.createExpressMiddleware({
    router: router_1.appRouter,
    createContext: context_1.createContext,
}));
app.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: "404 Error, Endpoint not found",
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
