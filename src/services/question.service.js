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

exports.getAllQuestions = async () => {
  const questions = await Question.find().populate("quiz", "title");
  return questions;
};

exports.getQuestionsByQuiz = async (quizId) => {
  const questions = await Question.find({ quiz: quizId });
  return questions;
};

exports.updateQuestion = async (id, data) => {
  const updated = await Question.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
};

exports.deleteQuestion = async (id) => {
  await Question.findByIdAndDelete(id);
};
