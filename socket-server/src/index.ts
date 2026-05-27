import dotenv from "dotenv";

dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import registerSocketHandlers from "./socket/socket";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_APP_URL || "http://localhost:3000",
    credentials: true,
  },
});

registerSocketHandlers(io);

server.listen(3001, () => {
  console.log("Socket server running on port 3001");
});
