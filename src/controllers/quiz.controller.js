const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// Crear un nuevo quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const createdBy = req.user.id; // Suponiendo que el user viene del middleware auth

    const newQuiz = new Quiz({ title, description, createdBy });
    await newQuiz.save();

    if (questions && questions.length > 0) {
      const questionDocs = await Question.insertMany(
        questions.map((q) => ({ ...q, quiz: newQuiz._id }))
      );
      newQuiz.questions = questionDocs.map((q) => q._id);
      await newQuiz.save();
    }

    res.status(201).json({ message: "Quiz created", quiz: newQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

// Obtener todos los quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("createdBy", "username")
      .populate("questions");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error getting quizzes:", error);
    res.status(500).json({ message: "Error getting quizzes" });
  }
};

// Obtener un quiz por ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("createdBy", "username")
      .populate("questions");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error getting quiz:", error);
    res.status(500).json({ message: "Error getting quiz" });
  }
};
