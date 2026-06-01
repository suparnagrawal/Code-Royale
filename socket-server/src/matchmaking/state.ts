export const userToRoom = new Map<string, string>();
export const userToSocket = new Map<string, string>();
export const disconnectTimers = new Map<string, NodeJS.Timeout>();

export interface ActiveGame {
  roomId: string;
  playerA: { userId: string; socketId: string; elo: number };
  playerB: { userId: string; socketId: string; elo: number };
  problemId: string;
  problemIds: string[];
  avgElo: number;
  language: string;
  status: "active" | "finished";
  startedAt: Date;
  winnerId?: string;
}

export const activeGames = new Map<string, ActiveGame>();
