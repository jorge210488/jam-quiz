const GameSession = require("../models/GameSession");

module.exports = (io, socket) => {
  socket.on("joinRoom", ({ roomId, user }) => {
    socket.join(roomId);
    io.to(roomId).emit("userJoined", user);
  });

  socket.on(
    "answer",
    async ({ sessionId, roomId, user, question, answer, timeTaken }) => {
      // Persistir la respuesta en la sesión
      try {
        const session = await GameSession.findById(sessionId);
        if (session) {
          session.responses.push({ user, question, answer, timeTaken });
          await session.save();

          io.to(roomId).emit("receiveAnswer", {
            user,
            question,
            answer,
            timeTaken,
          });
        }
      } catch (err) {
        console.error("Error saving answer:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado:", socket.id);
  });
};
