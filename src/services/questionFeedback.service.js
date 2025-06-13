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
