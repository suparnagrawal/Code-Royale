// socket.ts

import { Server } from "socket.io";

import { addToQueue, removeFromQueue } from "../matchmaking/queue";

import {
  userToRoom,
  userToSocket,
  disconnectTimers,
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

    socket.on("queue:enter", async () => {
      if (!socket.userId) return;

      //TODO: fetch elo from db
      const elo = 1000;

      addToQueue(io, socket.userId, socket.id, elo);
    });

    socket.on("queue:leave", () => {
      if (!socket.userId) return;

      removeFromQueue(socket.id);
    });

    // Typesync handling
    socket.on("typing:preview", ({ preview }) => {
      if (!socket.userId) return;

      const roomId = userToRoom.get(socket.userId);

      if (!roomId) return;

      socket.to(roomId).emit("opponent:preview", { preview });
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
