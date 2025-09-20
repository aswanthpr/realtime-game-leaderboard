import { Redis } from "ioredis";

let redis: Redis | null = null;
export const initRedis = (): Redis => {
  if (!redis) {
    redis = new Redis({
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
export const getRedis = (): Redis => {
  if (!redis) {
    throw new Error("Redis has not been initialized. Call initRedis() first.");
  }
  return redis;
};
