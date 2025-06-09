const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  timeTaken: {
    type: Number, // en segundos
    required: true,
  },
});

const gameSessionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    startTime: Date,
    endTime: Date,
    responses: [responseSchema],
    status: {
      type: String,
      enum: ["waiting", "started", "finished"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameSession", gameSessionSchema);
