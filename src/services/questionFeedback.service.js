const QuestionFeedback = require("../models/QuestionFeedback");

exports.createFeedback = async ({ question, user, isClear, comment }) => {
  const feedback = new QuestionFeedback({
    question,
    user,
    isClear,
    comment,
  });

  await feedback.save();
  return feedback;
};

exports.getAllFeedbacks = async () => {
  const feedbacks = await QuestionFeedback.find()
    .populate("question")
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return feedbacks;
};

exports.getFeedbacksByUser = async (userId) => {
  const feedbacks = await QuestionFeedback.find({ user: userId })
    .populate({
      path: "question",
      populate: {
        path: "quiz", // Asume que el modelo `Question` tiene un campo `quiz`
        model: "Quiz",
        select: "title description", // opcional: seleccionar campos específicos
      },
    })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return feedbacks;
};
