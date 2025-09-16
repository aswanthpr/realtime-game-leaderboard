"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const redis_config_1 = require("./configs/redis.config");
const leaderboard_routes_1 = __importDefault(require("./routers/leaderboard.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const mongoose_config_1 = require("./configs/mongoose.config");
const app = (0, express_1.default)();
(0, redis_config_1.initRedis)();
(0, mongoose_config_1.connectDb)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get("/health", (_req, res) => {
    res.send("API health is perfect...");
});
app.use("/leaderboard", leaderboard_routes_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
