import type { Server } from "socket.io";
import type { player } from "../types/player";
import { userToRoom } from "./state";

export function createGame(io: Server, p1: player, p2: player) {
  const roomId = crypto.randomUUID();

  io.sockets.sockets.get(p1.socketId)?.join(roomId);

  userToRoom.set(p1.userId, roomId);

  io.sockets.sockets.get(p2.socketId)?.join(roomId);

  userToRoom.set(p2.userId, roomId);

  io.in(roomId).emit("battle:start");
}
