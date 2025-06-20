const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socketIO = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*" },
});

const connectDB = require("./config/db");
const quizRoutes = require("./routes/quiz.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");
const gameSessionRoutes = require("./routes/gameSession.routes");
const questionFeedbackRoutes = require("./routes/questionFeedback.routes");
const adminRoutes = require("./routes/admin.routes");

const socketHandler = require("./sockets/socket.handler");

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/quizzes", quizRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/game-sessions", gameSessionRoutes);
app.use("/api/question-feedback", questionFeedbackRoutes);
app.use("/api/admin", adminRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("🟢 Usuario conectado:", socket.id);
  socketHandler(io, socket);
});

connectDB();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
