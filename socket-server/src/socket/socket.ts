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

      const game = activeGames.get(existingRoom);
      if (game && game.status !== "finished") {
        socket.emit("battle:ongoing", {
          problemIds: game.problemIds || (game.problemId ? [game.problemId] : []),
        });
      }
    }

    // Explicit reconnect check from Battlefield page
    socket.on("battle:check_reconnect", () => {
      const roomId = userToRoom.get(userId);
      if (!roomId) {
        socket.emit("battle:reconnect_failed");
        return;
      }
      
      const game = activeGames.get(roomId);
      if (!game || game.status === "finished") {
        socket.emit("battle:reconnect_failed");
        return;
      }

      const resolvedProblemIds = game.problemIds || (game.problemId ? [game.problemId] : []);

      socket.emit("battle:reconnect_success", { 
        startedAt: game.startedAt,
        problemIds: resolvedProblemIds,
        avgElo: game.avgElo || 1200
      });
    });

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

    // Helper to call Next.js Elo endpoint
    async function handleGameEnd(roomId: string, game: any, winnerId: string | null, draw: boolean = false) {
      if (game.status === "finished") return;
      game.status = "finished";
      game.winnerId = winnerId;
      
      const playerAId = game.playerA.userId;
      const playerBId = game.playerB.userId;
      
      let result: "winA" | "winB" | "draw" = "draw";
      if (!draw) {
        result = winnerId === playerAId ? "winA" : "winB";
      }

      let eloUpdates = null;
      try {
        const res = await fetch(`${process.env.NEXT_APP_URL || "http://localhost:3000"}/api/internal/elo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "req-internal-key": process.env.INTERNAL_API_KEY || "development_secret_key",
          },
          body: JSON.stringify({ playerAId, playerBId, result }),
        });
        if (res.ok) {
          eloUpdates = await res.json();
        } else {
          console.error("Elo update failed", await res.text());
        }
      } catch (err) {
        console.error("Failed to reach Elo API:", err);
      }

      io.to(roomId).emit("battle:result", { 
        winnerId, 
        loserId: winnerId === playerAId ? playerBId : winnerId === playerBId ? playerAId : null,
        draw,
        eloUpdates 
      });
      
      setTimeout(() => {
        activeGames.delete(roomId);
        userToRoom.delete(playerAId);
        userToRoom.delete(playerBId);
      }, 5000);
    }

    // Code submission and win detection
    socket.on("code:submitted", async () => {
      if (!socket.userId) return;
      const roomId = userToRoom.get(socket.userId);
      if (!roomId) return;
      
      const game = activeGames.get(roomId);
      if (!game) return;
      
      await handleGameEnd(roomId, game, socket.userId);
    });

    // Time expiry win detection
    socket.on("game:timeout_end", async ({ myScore, oppScore }) => {
      if (!socket.userId) return;
      const roomId = userToRoom.get(socket.userId);
      if (!roomId) return;
      
      const game = activeGames.get(roomId);
      if (!game || game.status === "finished") return; // Avoid processing twice if both clients emit

      let winnerId = null;
      let draw = false;
      if (myScore > oppScore) {
        winnerId = socket.userId;
      } else if (myScore < oppScore) {
        winnerId = game.playerA.userId === socket.userId ? game.playerB.userId : game.playerA.userId;
      } else {
        draw = true;
      }

      await handleGameEnd(roomId, game, winnerId, draw);
    });

    // Player Resign
    socket.on("player:resign", async () => {
      if (!socket.userId) return;
      const roomId = userToRoom.get(socket.userId);
      if (!roomId) return;
      
      const game = activeGames.get(roomId);
      if (!game || game.status === "finished") return;

      const winnerId = game.playerA.userId === socket.userId ? game.playerB.userId : game.playerA.userId;
      
      await handleGameEnd(roomId, game, winnerId, false);
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
        io.to(roomId).emit("opponent:reconnecting", {
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

        // trigger forfeit
        const game = activeGames.get(roomId);
        if (game && game.status !== "finished") {
          const winnerId = game.playerA.userId === userId ? game.playerB.userId : game.playerA.userId;
          handleGameEnd(roomId, game, winnerId, false).catch(err => console.error(err));
        }

        // cleanup room state
        userToRoom.delete(userId);
      }, RECONNECT_TIMEOUT);

      disconnectTimers.set(userId, timer);
    });
  });
}
