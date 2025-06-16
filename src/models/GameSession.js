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
  powerUpUsed: {
    type: String,
    enum: ["double_points", "skip", "none"],
    default: "none",
  },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  score: {
    type: Number,
    default: 0,
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
    teams: [teamSchema],
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
