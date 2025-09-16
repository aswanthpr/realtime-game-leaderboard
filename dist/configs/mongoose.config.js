"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL, {
            maxPoolSize: 20, // Maximum connections in pool
            minPoolSize: 5, // Keep at least 5 connections alive
            maxIdleTimeMS: 30000, // Close sockets after 30s idle
            serverSelectionTimeoutMS: 5000, // Fail fast if server not found
            socketTimeoutMS: 45000, // Close socket if no response within 45s
            //tuning for writes
            wtimeoutMS: 2500,
        });
        console.log('\x1b[35m%s\x1b[0m', 'database is connected successfully 🌱');
    }
    catch (error) {
        console.log('\x1b[34m%s\x1b[0m', 'failed to connect with database', error instanceof Error ? error.message : String(error));
    }
};
exports.connectDb = connectDb;
