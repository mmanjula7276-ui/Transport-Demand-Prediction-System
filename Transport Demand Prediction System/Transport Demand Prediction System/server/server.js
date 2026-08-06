import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import {connectDB} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import triproutes from "./routes/triproutes.js";
import { socketHandler } from "./socket.js";

dotenv.config();

// ✅ CONNECT DB (using your db.js)
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ SOCKET.IO
const io = new Server(server, {
  cors: { origin: "*" },
});

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/trips", triproutes);

// ✅ SOCKET HANDLER
socketHandler(io);

// ✅ START SERVER
server.listen(5000, () => {
  console.log("Server running on port 5000");
});