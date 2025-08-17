import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Setup socket.io with CORS config
const io = new Server(server, {
  cors: {
    origin: "*", // Change to frontend URL in production
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("chatMessage", (data) => {
    // data: { username, message }
    console.log(`💬 ${data.username}: ${data.message}`);
    io.emit("chatMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Socket.IO Chat Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});