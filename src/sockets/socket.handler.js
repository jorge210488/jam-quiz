const GameSession = require("../models/GameSession");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question"); // Agregamos esto para poder hacer el find

module.exports = (io, socket) => {
  socket.on("joinRoom", ({ roomId, user }) => {
    socket.join(roomId);
    io.to(roomId).emit("userJoined", user);
  });

  socket.on(
    "answer",
    async ({ sessionId, roomId, user, question, answer, timeTaken }) => {
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

  // 🚀 NUEVO → Control server-side con cola de preguntas (Opción 1)
  socket.on("startGame", async ({ sessionId, roomId, durationPerQuestion }) => {
    try {
      const session = await GameSession.findById(sessionId).populate("quiz");
      if (!session) return;

      // Obtenemos las preguntas del quiz → SIN CAMBIAR EL MODELO QUIZ
      const questions = await Question.find({ quiz: session.quiz._id }).sort({
        createdAt: 1,
      });
      const questionIds = questions.map((q) => q._id);

      if (questionIds.length === 0) {
        console.error("El quiz no tiene preguntas.");
        return;
      }

      session.startTime = new Date();
      session.status = "started";
      await session.save();

      let currentQuestionIndex = 0;

      const sendNextQuestion = async () => {
        if (currentQuestionIndex >= questionIds.length) {
          // Partida terminada
          session.endTime = new Date();
          session.status = "finished";
          await session.save();

          io.to(roomId).emit("gameFinished", {
            message: "🎉 El quiz ha terminado.",
          });
          return;
        }

        const questionId = questionIds[currentQuestionIndex];
        const now = new Date();
        const endTime = new Date(now.getTime() + durationPerQuestion * 1000);

        // Actualizamos startTime y endTime de la sesión (opcional)
        session.startTime = now;
        session.endTime = endTime;
        await session.save();

        io.to(roomId).emit("startQuestion", {
          questionId,
          endTime,
        });

        // Programamos el siguiente paso
        setTimeout(() => {
          io.to(roomId).emit("questionTimeout", {
            questionId,
            message: "⏰ Tiempo terminado para esta pregunta.",
          });

          // Pasamos a la siguiente pregunta
          currentQuestionIndex++;
          sendNextQuestion();
        }, durationPerQuestion * 1000);
      };

      // Iniciamos la primera pregunta
      sendNextQuestion();
    } catch (err) {
      console.error("Error en startGame:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado:", socket.id);
  });
};
