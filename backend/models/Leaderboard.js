const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  wins: { type: Number, default: 1 }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);