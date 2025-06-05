const Question = require("../models/Question");

// Crear una pregunta individual
exports.createQuestion = async (req, res) => {
  try {
    const { quiz, questionText, options, correctAnswer, timeLimit } = req.body;

    const newQuestion = new Question({
      quiz,
      questionText,
      options,
      correctAnswer,
      timeLimit,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({ message: "Question created", question: newQuestion });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Error creating question" });
  }
};

// Obtener preguntas de un quiz
exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const questions = await Question.find({ quiz: quizId });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ message: "Error getting questions" });
  }
};
