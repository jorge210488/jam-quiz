const GameSession = require("../models/GameSession");

exports.createGameSession = async ({ quiz, players }) => {
  const newSession = new GameSession({
    quiz,
    players,
    startTime: new Date(),
    status: "started",
  });

  await newSession.save();
  return newSession;
};

exports.addResponse = async (
  sessionId,
  { user, question, answer, timeTaken, powerUpUsed }
) => {
  const session = await GameSession.findById(sessionId);
  if (!session) throw new Error("GameSession not found");

  session.responses.push({ user, question, answer, timeTaken, powerUpUsed });
  await session.save();

  return session;
};

exports.getGameSessionById = async (sessionId) => {
  const session = await GameSession.findById(sessionId)
    .populate("quiz")
    .populate("players", "name email")
    .populate("responses.user", "name email")
    .populate("responses.question");

  if (!session) throw new Error("GameSession not found");

  return session;
};

exports.getGameSessionsByUser = async (userId) => {
  const sessions = await GameSession.find({ players: userId })
    .populate("quiz", "title")
    .populate("responses.user", "name")
    .populate("responses.question", "correctAnswer");

  const result = sessions.map((session) => {
    const userResponses = session.responses.filter(
      (res) => res.user._id.toString() === userId
    );

    const score = userResponses.reduce((acc, res) => {
      const isCorrect =
        res.question.correctAnswer && res.answer === res.question.correctAnswer;
      return isCorrect ? acc + 1 : acc;
    }, 0);

    return {
      sessionId: session._id,
      quizTitle: session.quiz.title,
      startTime: session.startTime,
      endTime: session.endTime,
      totalQuestions: userResponses.length,
      score,
    };
  });

  return result;
};

exports.finishGameSession = async (sessionId) => {
  const session = await GameSession.findById(sessionId);
  if (!session) throw new Error("Session not found");

  session.status = "finished";
  session.endTime = new Date();

  await session.save();
  return session;
};
