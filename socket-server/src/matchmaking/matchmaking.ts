import type { Server } from "socket.io";
import { queue } from "./queue";
import { createGame } from "./game";

export function matchPlayers(io: Server) {
  if (queue.length < 2) return;
  queue.sort((a, b) => a.elo - b.elo);

  while (queue.length >= 2) {
    const p1 = queue.shift();
    const p2 = queue.shift();

    createGame(io, p1!, p2!);
  }
}
