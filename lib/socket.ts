"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(ticket?: string) {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      autoConnect: false,
      withCredentials: true,
      extraHeaders: {
        "ngrok-skip-browser-warning": "true"
      }
    });
  }

  if (ticket) {
    socket.auth = { ticket };
  }

  return socket;
}
