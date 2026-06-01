import { Server, Socket } from "socket.io";
import { userToSocket } from "../../matchmaking/state";

import crypto from "crypto";

type TicketPayload = {
  userId: string;
  exp: number;
};

declare module "socket.io" {
  interface Socket {
    userId?: string;
  }
}

export default function registerAuthMiddleware(io: Server) {
  return async (socket: Socket, next: (err?: Error) => void) => {
    try {
      console.log(`[AUTH] Authenticating socket ${socket.id}...`);
      
      const ticket = socket.handshake.auth.ticket;
      if (!ticket) {
        console.error(`[AUTH] No ticket provided.`);
        return next(new Error("Unauthorized"));
      }

      const [payloadBase64, signature] = ticket.split(".");
      if (!payloadBase64 || !signature) {
        console.error(`[AUTH] Invalid ticket format.`);
        return next(new Error("Unauthorized"));
      }

      // Re-hash to verify
      const expectedSignature = crypto
        .createHmac("sha256", process.env.INTERNAL_API_KEY!)
        .update(payloadBase64)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error(`[AUTH] Invalid ticket signature.`);
        return next(new Error("Unauthorized"));
      }

      const payloadStr = Buffer.from(payloadBase64, "base64").toString("utf8");
      const payload = JSON.parse(payloadStr) as TicketPayload;
      
      if (Date.now() > payload.exp) {
        console.error(`[AUTH] Ticket expired.`);
        return next(new Error("Unauthorized"));
      }

      const userId = payload.userId;
      socket.userId = userId;

      const oldSocketId = userToSocket.get(userId);
      if (oldSocketId && oldSocketId !== socket.id) {
        const oldSocket = io.sockets.sockets.get(oldSocketId);

        oldSocket?.disconnect(true);
      }

      userToSocket.set(userId, socket.id);

      console.log(`[AUTH] Success! Socket ${socket.id} authenticated as User ${userId}`);
      next();
    } catch (err) {
      console.error(`[AUTH] Exception during authentication:`, err);
      next(new Error("Unauthorized"));
    }
  };
}
