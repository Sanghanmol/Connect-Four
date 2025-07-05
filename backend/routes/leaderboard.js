const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

router.get('/', async (req, res) => {
  try {
    const top = await Leaderboard.find().sort({ wins: -1 }).limit(10);
    res.json(top);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;