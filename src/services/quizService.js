const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

exports.createQuiz = async ({ title, description, questions, createdBy }) => {
  const newQuiz = new Quiz({ title, description, createdBy });
  await newQuiz.save();

  if (questions && questions.length > 0) {
    await Question.insertMany(
      questions.map((q) => ({ ...q, quiz: newQuiz._id }))
    );
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
