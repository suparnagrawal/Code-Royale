import type { Server } from "socket.io";
import type { player } from "../types/player";
import { userToRoom, activeGames } from "./state";

export async function createGame(io: Server, p1: player, p2: player) {
  const roomId = crypto.randomUUID();

  // Fetch a random problem based on average elo
  const avgElo = Math.floor((p1.elo + p2.elo) / 2);
  let problem: {
    id: string;
    title: string;
    starterCode: Record<string, string>;
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_APP_URL}/api/internal/problem/random?avgElo=${avgElo}`,
      {
        headers: {
          "req-internal-key": process.env.INTERNAL_API_KEY!,
        },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch problem:", res.status);
      return;
    }

    problem = await res.json();
  } catch (err) {
    console.error("Error fetching problem:", err);
    return;
  }

  // Join players to the room
  io.sockets.sockets.get(p1.socketId)?.join(roomId);
  userToRoom.set(p1.userId, roomId);

  io.sockets.sockets.get(p2.socketId)?.join(roomId);
  userToRoom.set(p2.userId, roomId);

  // Store the active game
  activeGames.set(roomId, {
    roomId,
    playerA: { userId: p1.userId, socketId: p1.socketId, elo: p1.elo },
    playerB: { userId: p2.userId, socketId: p2.socketId, elo: p2.elo },
    problemId: problem.id,
    language: "cpp",
    status: "active",
    startedAt: new Date(),
  });

  // Emit battle start with problem data
  io.in(roomId).emit("battle:start", {
    roomId,
    problemId: problem.id,
    title: problem.title,
    starterCode: problem.starterCode,
  });
}
