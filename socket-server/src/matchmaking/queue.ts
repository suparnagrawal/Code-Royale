import type { Server } from "socket.io";
import { matchPlayers } from "./matchmaking";
import type { player } from "../types/player";

export const queue: player[] = [];

export function addToQueue(
  io: Server,
  userId: string,
  socketId: string,
  elo: number,
) {
  queue.push({
    userId,
    socketId,
    elo,
  });

  io.to(socketId).emit("queued");

  matchPlayers(io);
}

export function removeFromQueue(socketId: string) {
  const idx = queue.findIndex((p) => p.socketId === socketId);

  if (idx !== -1) {
    queue.splice(idx, 1);
  }
}
