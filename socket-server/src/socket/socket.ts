// socket.ts

import { Server } from "socket.io";

import { addToQueue, removeFromQueue } from "../matchmaking/queue";

import {
  userToRoom,
  userToSocket,
  disconnectTimers,
  activeGames,
} from "../matchmaking/state";
import registerAuthMiddleware from "./middleware/auth";

const RECONNECT_TIMEOUT = 30_000;

type AuthResponse = {
  user: {
    id: string;
  };
};

declare module "socket.io" {
  interface Socket {
    userId?: string;
  }
}

export default function registerSocketHandlers(io: Server) {
  io.use(registerAuthMiddleware(io));

  // Connection handler
  io.on("connection", (socket) => {
    const userId = socket.userId;

    if (!userId) {
      socket.disconnect();

      return;
    }

    const existingTimer = disconnectTimers.get(userId);

    if (existingTimer) {
      clearTimeout(existingTimer);

      disconnectTimers.delete(userId);
    }

    // -----------------------------------
    // Rejoin existing room
    // -----------------------------------
    const existingRoom = userToRoom.get(userId);

    if (existingRoom) {
      socket.to(existingRoom).emit("opponent:reconnected");
      socket.join(existingRoom);
    }

    // Queue handling

    socket.on("queue:enter", async (data: any) => {
      if (!socket.userId) return;

      const elo = 1000;
      let gameLength = 1;
      
      if (typeof data === "object" && data !== null && data.gameLength) {
        gameLength = data.gameLength;
      }

      addToQueue(io, socket.userId, socket.id, elo, gameLength);
    });

    socket.on("queue:leave", () => {
      if (!socket.userId) return;

      removeFromQueue(socket.userId);
    });

    // Typesync handling
    socket.on("typing:preview", ({ preview, problemIndex }) => {
      if (!socket.userId) return;

      const roomId = userToRoom.get(socket.userId);

      if (!roomId) return;

      socket.to(roomId).emit("opponent:preview", { preview, problemIndex });
    });

    socket.on("opponent:status_update", ({ problemIndex, status, passedCount }) => {
      if (!socket.userId) return;
      const roomId = userToRoom.get(socket.userId);
      if (!roomId) return;

      socket.to(roomId).emit("opponent:status_update", { problemIndex, status, passedCount });
    });

    // Code submission and win detection
    socket.on("code:submitted", () => {
      if (!socket.userId) return;
      const roomId = userToRoom.get(socket.userId);
      if (!roomId) return;
      
      const game = activeGames.get(roomId);
      if (!game || game.status === "finished") return;
      
      game.status = "finished";
      game.winnerId = socket.userId;
      
      const loserId = game.playerA.userId === socket.userId ? game.playerB.userId : game.playerA.userId;
      
      io.to(roomId).emit("battle:result", { winnerId: socket.userId, loserId });
      
      setTimeout(() => {
        activeGames.delete(roomId);
        userToRoom.delete(game.playerA.userId);
        userToRoom.delete(game.playerB.userId);
      }, 5000);
    });

    // Unexpected disconnect handling
    socket.on("disconnect", () => {
      if (!socket.userId) return;

      const userId = socket.userId;

      // ignore stale socket disconnects
      if (userToSocket.get(userId) !== socket.id) {
        return;
      }

      userToSocket.delete(userId);

      const roomId = userToRoom.get(userId);

      if (roomId) {
        socket.to(roomId).emit("opponent:reconnecting", {
          reconnectEndsAt: RECONNECT_TIMEOUT,
        });
      }

      const timer = setTimeout(() => {
        disconnectTimers.delete(userId);

        // user already reconnected
        if (userToSocket.has(userId)) {
          return;
        }

        // user was only in queue
        if (!roomId) {
          removeFromQueue(userId);

          return;
        }

        // notify final leave
        io.to(roomId).emit("opponent:left");

        // cleanup room state
        userToRoom.delete(userId);
      }, RECONNECT_TIMEOUT);

      disconnectTimers.set(userId, timer);
    });
  });
}
