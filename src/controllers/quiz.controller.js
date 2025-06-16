const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const quizService = require("../services/quizService");

// Crear un nuevo quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const createdBy = req.user.id; // Viene del middleware auth

    const newQuiz = new Quiz({ title, description, createdBy });
    await newQuiz.save();

    // Si se envían preguntas al crear el quiz
    if (questions && questions.length > 0) {
      await Question.insertMany(
        questions.map((q) => ({ ...q, quiz: newQuiz._id }))
      );
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
    const quizzes = await Quiz.find().populate("createdBy", "username");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error getting quizzes:", error);
    res.status(500).json({ message: "Error getting quizzes" });
  }
};

// Obtener un quiz por ID con sus preguntas reales
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate(
      "createdBy",
      "username"
    );

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Traer las questions reales de la colección Question
    const questions = await Question.find({ quiz: quiz._id });

    res.status(200).json({
      quiz,
      questions,
    });
  } catch (error) {
    console.error("Error getting quiz:", error);
    res.status(500).json({ message: "Error getting quiz" });
  }
};

// Obtener todos los quizzes activos
exports.getActiveQuizzes = async (req, res) => {
  try {
    const quizzes = await quizService.getActiveQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error getting active quizzes:", error);
    res.status(500).json({ message: "Error getting active quizzes" });
  }
};
