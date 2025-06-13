const gameSessionService = require("../services/gameSession.service");

exports.createGameSession = async (req, res) => {
  try {
    const { quiz, players } = req.body;
    const session = await gameSessionService.createGameSession({
      quiz,
      players,
    });

    res.status(201).json({ message: "GameSession created", session });
  } catch (error) {
    console.error("Error creating GameSession:", error);
    res.status(500).json({ message: "Error creating GameSession" });
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
