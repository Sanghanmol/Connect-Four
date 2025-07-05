const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [String],
  winner: String,
  board: [[Number]],
  duration: Number,
  endedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);