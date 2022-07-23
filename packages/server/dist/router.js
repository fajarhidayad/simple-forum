"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const context_1 = require("./utils/context");
const tweet_1 = __importDefault(require("./routes/tweet"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const comment_1 = __importDefault(require("./routes/comment/comment"));
const like_1 = __importDefault(require("./routes/like/like"));
const bookmark_1 = __importDefault(require("./routes/bookmark/bookmark"));
exports.appRouter = context_1.createRouter()
    .merge("tweet.", tweet_1.default)
    .merge("auth.", auth_1.default)
    .merge("user.", user_1.default)
    .merge("comment.", comment_1.default)
    .merge("like.", like_1.default)
    .merge("bookmark.", bookmark_1.default);
