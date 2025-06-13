const mongoose = require("mongoose");

const questionFeedbackSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isClear: {
      type: Boolean,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionFeedback", questionFeedbackSchema);
