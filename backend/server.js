require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use(cors());
app.use(express.json());

app.use('/leaderboard', require('./routes/leaderboard'));
require('./socketManager')(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));