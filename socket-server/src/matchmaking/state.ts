export const userToRoom = new Map<string, string>();
export const userToSocket = new Map<string, string>();
export const disconnectTimers = new Map<string, NodeJS.Timeout>();

export const activeGames = new Map<
  string,
  {
    players: string[];
  }
>();
