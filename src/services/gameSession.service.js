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
