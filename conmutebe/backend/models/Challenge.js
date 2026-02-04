const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    points: Number,
    target: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Challenge', ChallengeSchema);
