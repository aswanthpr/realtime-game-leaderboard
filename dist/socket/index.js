"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
exports.initSocket = initSocket;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
function initSocket(httpServer) {
    exports.io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    exports.io.on("connection", (socket) => {
        console.log("✅ Client connected:", socket.id);
        registerLeaderboardHandlers(socket);
        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
    return exports.io;
}
function getIO() {
    if (!exports.io) {
        throw new Error("Socket.IO not initialized! Call initSocket first.");
    }
    return exports.io;
}
function registerLeaderboardHandlers(socket) {
    socket.on("leaderboard:updateScore", (data) => {
        console.log("📊 Leaderboard score update:", data);
        exports.io.emit("leaderboard:update", { leaderboard: "new data" });
    });
}
