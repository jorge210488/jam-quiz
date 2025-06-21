const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  iconUrl: String,
  condition: {
    type: String, // ejemplo: "first_quiz", "perfect_score", etc.
    required: true,
  },
});

module.exports = mongoose.model("Badge", badgeSchema);
