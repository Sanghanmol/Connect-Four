require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use(cors());
app.use(express.json());

app.use('/leaderboard', require('./routes/leaderboard'));
require('./socketManager')(io);

app.use(express.static(path.join(__dirname, 'client')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));