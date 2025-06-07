const Question = require("../models/Question");

exports.createQuestion = async ({
  quiz,
  questionText,
  options,
  correctAnswer,
  timeLimit,
}) => {
  const newQuestion = new Question({
    quiz,
    questionText,
    options,
    correctAnswer,
    timeLimit,
  });

  await newQuestion.save();

  // Ya NO actualizamos "Quiz.questions", porque no existe → limpio
  return newQuestion;
};

exports.getQuestionsByQuiz = async (quizId) => {
  const questions = await Question.find({ quiz: quizId });
  return questions;
};
