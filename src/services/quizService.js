const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

exports.createQuiz = async ({ title, description, questions, createdBy }) => {
  const newQuiz = new Quiz({ title, description, createdBy });
  await newQuiz.save();

  if (questions && questions.length > 0) {
    // Obtener textos únicos por pregunta (para no duplicar contenido)
    const questionTexts = new Set();

    const filteredQuestions = questions.filter((q) => {
      if (questionTexts.has(q.questionText)) {
        return false; // ya está
      }
      questionTexts.add(q.questionText);
      return true;
    });

    const questionsToInsert = filteredQuestions.map((q) => ({
      ...q,
      quiz: newQuiz._id,
    }));

    await Question.insertMany(questionsToInsert);
  }

  return newQuiz;
};

exports.getAllQuizzes = async () => {
  const quizzes = await Quiz.find().populate("createdBy", "username");

  return quizzes;
};

exports.getQuizById = async (quizId) => {
  const quiz = await Quiz.findById(quizId).populate("createdBy", "username");

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  const questions = await Question.find({ quiz: quiz._id });

  return { quiz, questions };
};

exports.getActiveQuizzes = async () => {
  const quizzes = await Quiz.find({ isActive: true }).populate(
    "createdBy",
    "username"
  );
  return quizzes;
};

exports.updateQuiz = async ({
  quizId,
  title,
  description,
  isOpen,
  isLive,
  isActive,
  questions = [],
}) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new Error("Quiz not found");
  }

  // Actualizar campos básicos si vienen definidos
  if (title !== undefined) quiz.title = title;
  if (description !== undefined) quiz.description = description;
  if (isOpen !== undefined) quiz.isOpen = isOpen;
  if (isLive !== undefined) quiz.isLive = isLive;
  if (isActive !== undefined) quiz.isActive = isActive;

  await quiz.save();

  if (questions.length > 0) {
    // Evitar preguntas duplicadas (por texto)
    const existingQuestions = await Question.find({ quiz: quiz._id });
    const existingTexts = new Set(existingQuestions.map((q) => q.questionText));

    const newQuestions = questions.filter(
      (q) => !existingTexts.has(q.questionText)
    );

    const questionsToInsert = newQuestions.map((q) => ({
      ...q,
      quiz: quiz._id,
    }));

    await Question.insertMany(questionsToInsert);
  }

  return quiz;
};
