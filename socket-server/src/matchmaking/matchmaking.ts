import type { Server } from "socket.io";
import { queue } from "./queue";
import { createGame } from "./game";

export function matchPlayers(io: Server) {
  if (queue.length < 2) return;
  queue.sort((a, b) => a.elo - b.elo);

  // We need to find pairs of players with the SAME gameLength
  for (let i = 0; i < queue.length; i++) {
    const p1 = queue[i];
    
    for (let j = i + 1; j < queue.length; j++) {
      const p2 = queue[j];
      
      if (p1.gameLength === p2.gameLength) {
        // Match found!
        queue.splice(j, 1);
        queue.splice(i, 1);
        
        createGame(io, p1, p2);
        
        // Restart the matching process since array mutated
        matchPlayers(io);
        return;
      }
    }
  }
}
