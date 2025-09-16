import {Server, Socket} from "socket.io";
import {Server as HttpServer} from 'http';

export let io :Server;

export function initSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

     io.on("connection", (socket: Socket) => {
    console.log("✅ Client connected:", socket.id);

     registerLeaderboardHandlers(socket);
     
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
}


export function getIO(): Server {
    if(!io){
     throw new Error("Socket.IO not initialized! Call initSocket first.");
  }
  return io; 
} 
function registerLeaderboardHandlers(socket: Socket) {
  socket.on("leaderboard:updateScore", (data) => {
    console.log("📊 Leaderboard score update:", data);
    
    io.emit("leaderboard:update", { leaderboard: "new data" });
  });
}