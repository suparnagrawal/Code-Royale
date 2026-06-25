import type { Server } from "socket.io";
import { matchPlayers } from "./matchmaking";
import type { player } from "../types/player";

export const queue: player[] = [];

export function addToQueue(
  io: Server,
  userId: string,
  socketId: string,
  elo: number,
  gameLength: number = 1
) {
  // remove existing entry to prevent duplicate queueing
  removeFromQueue(userId);

  queue.push({
    userId,
    socketId,
    elo,
    gameLength,
    queuedAt: Date.now(),
  });

  io.to(socketId).emit("queued");

  matchPlayers(io);
}

export function removeFromQueue(userId: string) {
  const idx = queue.findIndex((p) => p.userId === userId);

  if (idx !== -1) {
    queue.splice(idx, 1);
  }
}
