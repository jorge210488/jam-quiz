const GameSession = require("../models/GameSession");
const Question = require("../models/Question");

exports.getDashboardData = async () => {
  // 1. Quizzes activos
  const activeQuizzesCount = await GameSession.countDocuments({
    status: "started",
  });

  // 2. Obtener sesiones finalizadas con datos populados
  const sessions = await GameSession.find({ status: "finished" }).populate(
    "responses.user responses.question"
  );

  // 3. Global ranking (más respuestas correctas por usuario)
  const scoreByUser = {};
  for (const session of sessions) {
    for (const resp of session.responses) {
      if (!resp.question || !resp.user) continue;

      const isCorrect = resp.question.correctAnswer === resp.answer;

      if (!scoreByUser[resp.user._id]) {
        scoreByUser[resp.user._id] = { user: resp.user.name, correct: 0 };
      }
      if (isCorrect) scoreByUser[resp.user._id].correct++;
    }
  }

  const globalRanking = Object.values(scoreByUser)
    .sort((a, b) => b.correct - a.correct)
    .slice(0, 10);

  // 4. Preguntas más falladas
  const failCountByQuestion = {};
  for (const session of sessions) {
    for (const resp of session.responses) {
      if (!resp.question || !resp.user) continue;

      const isCorrect = resp.question.correctAnswer === resp.answer;
      if (!isCorrect) {
        const qId = resp.question._id;
        if (!failCountByQuestion[qId]) {
          failCountByQuestion[qId] = {
            questionText: resp.question.questionText,
            fails: 0,
          };
        }
        failCountByQuestion[qId].fails++;
      }
    }
  }

  const mostFailedQuestions = Object.values(failCountByQuestion)
    .sort((a, b) => b.fails - a.fails)
    .slice(0, 5);

  // 5. Top jugadores (respuesta más rápida)
  const userSpeed = {};
  for (const session of sessions) {
    for (const resp of session.responses) {
      if (!resp.question || !resp.user) continue;

      if (!userSpeed[resp.user._id]) {
        userSpeed[resp.user._id] = {
          user: resp.user.name,
          totalTime: 0,
          answers: 0,
        };
      }
      userSpeed[resp.user._id].totalTime += resp.timeTaken;
      userSpeed[resp.user._id].answers++;
    }
  }

  const topPlayers = Object.values(userSpeed)
    .map((u) => ({
      user: u.user,
      avgTime: u.totalTime / u.answers,
    }))
    .sort((a, b) => a.avgTime - b.avgTime)
    .slice(0, 5);

  return {
    activeQuizzesCount,
    globalRanking,
    mostFailedQuestions,
    topPlayers,
  };
};
