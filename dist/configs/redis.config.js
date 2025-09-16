"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = exports.initRedis = void 0;
const ioredis_1 = require("ioredis");
let redis = null;
const initRedis = () => {
    if (!redis) {
        redis = new ioredis_1.Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            db: 0,
        });
        redis
            .on("connect", () => console.log("✅ Redis connected"))
            .on("error", (err) => console.log("❌ Redis error:", err));
    }
    return redis;
};
exports.initRedis = initRedis;
const getRedis = () => {
    if (!redis) {
        throw new Error("Redis has not been initialized. Call initRedis() first.");
    }
    return redis;
};
exports.getRedis = getRedis;
