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
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  },
});

import { matchPlayers } from "./matchmaking/matchmaking";

registerSocketHandlers(io);

// Periodically run matchmaking to catch people whose Elo difference tolerance has increased
setInterval(() => {
  matchPlayers(io);
}, 2000);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
