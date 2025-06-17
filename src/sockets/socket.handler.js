const mongoose = require("mongoose");
const GameSession = require("../models/GameSession");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

module.exports = (io, socket) => {
  socket.on("joinRoom", ({ roomId, user }) => {
    socket.join(roomId);
    io.to(roomId).emit("userJoined", user);
  });

  socket.on("startGame", async ({ sessionId, roomId, durationPerQuestion }) => {
    try {
      const session = await GameSession.findById(sessionId).populate("quiz");
      if (!session) return;

      const questions = await Question.find({ quiz: session.quiz._id }).sort({
        createdAt: 1,
      });
      if (questions.length === 0) {
        console.error("❌ El quiz no tiene preguntas.");
        return;
      }

      session.startTime = new Date();
      session.status = "started";
      await session.save();

      let currentQuestionIndex = 0;

      const sendNextQuestion = async () => {
        if (currentQuestionIndex >= questions.length) {
          session.endTime = new Date();
          session.status = "finished";
          await session.save();

          io.to(roomId).emit("gameFinished", {
            message: "🎉 El quiz ha terminado.",
          });
          return;
        }

        const question = questions[currentQuestionIndex];
        const endTime = new Date(Date.now() + durationPerQuestion * 1000);

        io.to(roomId).emit("startQuestion", {
          questionId: question._id,
          endTime,
          questionText: question.questionText,
          options: question.options,
        });

        setTimeout(() => {
          io.to(roomId).emit("questionTimeout", {
            questionId: question._id,
            message: "⏰ Tiempo terminado para esta pregunta.",
          });

          currentQuestionIndex++;
          sendNextQuestion();
        }, durationPerQuestion * 1000);
      };

      sendNextQuestion();
    } catch (err) {
      console.error("❌ Error en startGame:", err);
    }
  });

  socket.on(
    "answer",
    async ({
      sessionId,
      roomId,
      user,
      question,
      answer,
      timeTaken,
      powerUpUsed,
    }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(question)) {
          console.warn("❌ question inválido recibido:", question);
          return;
        }

        const session = await GameSession.findById(sessionId);
        if (!session) return;

        const questionDoc = await Question.findById(question);
        if (!questionDoc) return;

        const isCorrect = answer === questionDoc.correctAnswer;

        let basePoints = 10;
        let pointsEarned = 0;

        if (powerUpUsed === "double_points") {
          pointsEarned = isCorrect ? basePoints * 2 : 0;
        } else if (powerUpUsed === "skip") {
          pointsEarned = 0;
        } else {
          pointsEarned = isCorrect ? basePoints : 0;
        }

        session.responses.push({
          user,
          question: new mongoose.Types.ObjectId(question),
          answer,
          timeTaken,
          powerUpUsed,
        });

        // Actualizar equipo (si existe)
        const team = session.teams.find((t) =>
          t.members.some((memberId) => memberId.equals(user))
        );
        if (team) {
          team.score += pointsEarned;
        }

        // Actualizar score individual
        let playerEntry = session.individualScores.find((p) =>
          p.user.equals(user)
        );

        if (playerEntry) {
          playerEntry.score += pointsEarned;
        } else {
          session.individualScores.push({ user, score: pointsEarned });
        }

        await session.save();

        io.to(roomId).emit("receiveAnswer", {
          user,
          question,
          answer,
          timeTaken,
          powerUpUsed,
          isCorrect,
          pointsEarned,
          teamScore: team ? team.score : null,
          playerScore: playerEntry ? playerEntry.score : pointsEarned, // si es su primera vez, usa lo ganado ahora
        });
      } catch (err) {
        console.error("❌ Error saving answer:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado:", socket.id);
  });
};
