import dotenv from "dotenv";

dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import registerSocketHandlers from "./socket/socket";
import { userToRoom } from "./matchmaking/state";
import { queue } from "./matchmaking/queue";
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

registerSocketHandlers(io);

const timerId = setInterval(() => {
  console.log(userToRoom);
  console.log(queue);
}, 2000);

server.listen(3001, () => {
  console.log("Socket server running on port 3001");
});
