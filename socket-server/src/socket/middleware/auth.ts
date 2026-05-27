import { Server, Socket } from "socket.io";
import { userToSocket } from "../../matchmaking/state";

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

export default function registerAuthMiddleware(io: Server) {
  return async (socket: Socket, next: (err?: Error) => void) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_APP_URL}/api/internal/user-info`,
        {
          headers: {
            cookie: socket.handshake.headers.cookie || "",

            "req-internal-key": process.env.INTERNAL_API_KEY!,
          },
        },
      );

      if (!response.ok) {
        return next(new Error("Unauthorized"));
      }

      /*
      1. Attach authenticated user to socket 
      2. Disconnect old socket ,if any
      3. Update userToSocket map to new socket
      */
      const data = (await response.json()) as AuthResponse;
      const userId = data.user.id;
      socket.userId = userId;

      const oldSocketId = userToSocket.get(userId);
      if (oldSocketId && oldSocketId !== socket.id) {
        const oldSocket = io.sockets.sockets.get(oldSocketId);

        oldSocket?.disconnect(true);
      }

      userToSocket.set(userId, socket.id);

      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  };
}
