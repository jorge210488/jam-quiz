const questionService = require("../services/question.service");

// Crear una pregunta individual
exports.createQuestion = async (req, res) => {
  try {
    const { quiz, questionText, options, correctAnswer, timeLimit } = req.body;

    const newQuestion = await questionService.createQuestion({
      quiz,
      questionText,
      options,
      correctAnswer,
      timeLimit,
    });

    res
      .status(201)
      .json({ message: "Question created", question: newQuestion });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Error creating question" });
  }
};

// Obtener todas las preguntas
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting all questions:", error);
    res.status(500).json({ message: "Error getting all questions" });
  }
};

// Obtener preguntas de un quiz
exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const questions = await questionService.getQuestionsByQuiz(quizId);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ message: "Error getting questions" });
  }
};

// Actualizar una pregunta
exports.updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const updated = await questionService.updateQuestion(questionId, req.body);

    res.status(200).json({ message: "Question updated", question: updated });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Error updating question" });
  }
};

// Eliminar una pregunta
exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    await questionService.deleteQuestion(questionId);

    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Error deleting question" });
  }
};
