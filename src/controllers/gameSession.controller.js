const gameSessionService = require("../services/gameSession.service");

exports.createGameSession = async (req, res) => {
  try {
    const { quiz, players } = req.body;
    const session = await gameSessionService.createGameSession({
      quiz,
      players,
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: "Error creating game session" });
  }
};

exports.addResponse = async (req, res) => {
  try {
    const { user, question, answer, timeTaken, powerUpUsed } = req.body;

    const sessionId = req.params.id;

    const session = await gameSessionService.addResponse(sessionId, {
      user,
      question,
      answer,
      timeTaken,
      powerUpUsed,
    });

    res.status(200).json({ message: "Response added", session });
  } catch (error) {
    console.error("Error adding response:", error);
    res.status(500).json({ message: "Error adding response" });
  }
};

exports.getGameSessionById = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await gameSessionService.getGameSessionById(sessionId);

    res.status(200).json(session);
  } catch (error) {
    console.error("Error getting GameSession:", error);
    res.status(500).json({ message: "Error getting GameSession" });
  }
};

exports.getSessionsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const sessions = await gameSessionService.getGameSessionsByUser(userId);
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Error fetching user sessions" });
  }
};

exports.finishGameSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await gameSessionService.finishGameSession(sessionId);

    res.status(200).json({ message: "GameSession finished", session });
  } catch (error) {
    console.error("Error finishing session:", error);
    res.status(500).json({ message: "Error finishing session" });
  }
};

exports.joinSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { userId } = req.body;

    const session = await gameSessionService.joinGameSession(sessionId, userId);
    res.status(200).json({ message: "User joined", session });
  } catch (error) {
    console.error("Error joining session:", error);
    res.status(500).json({ message: "Error joining session" });
  }
};
