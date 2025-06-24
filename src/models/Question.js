const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      validate: [(val) => val.length >= 2, "At least 2 options required"],
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    timeLimit: {
      type: Number,
      default: 30,
    },

    // 🟡 NUEVO CAMPO: Traducciones
    translations: {
      type: Map,
      of: new mongoose.Schema({
        questionText: String,
        options: [String],
        correctAnswer: String,
      }),
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
