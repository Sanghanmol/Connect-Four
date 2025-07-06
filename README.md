# 🎯 Connect Four - Multiplayer Game (MERN + Socket.IO)

A real-time multiplayer Connect Four game built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for live gameplay and a persistent **Leaderboard** for tracking player wins.

Players can join a game with a username, compete in real-time (vs player or bot), and automatically see updated rankings after each match!

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

---

## 🔍 Overview

This project brings the classic Connect Four game online with the power of WebSockets. It includes:

- Real-time multiplayer game with random matchmaking
- Optional fallback to play against a bot
- Win detection and smart game state updates
- Persistent leaderboard stored in MongoDB
- Full responsive UI built with React and Vite

---

## ✨ Features

- 🎮 **Multiplayer Gameplay**: Two users are matched live using Socket.IO.
- 🤖 **Bot Support**: If no player joins within 10 seconds, play against a bot.
- 📊 **Leaderboard**: Persistent leaderboard showing players' win counts.
- 📦 **Single Deployment**: Frontend is built and served from the Express backend.
- ⚡ **Responsive UI**: Smooth user experience on both desktop and mobile.

---

## ⚙️ Tech Stack

- **Frontend**: React, Vite, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Real-time Communication**: Socket.IO
- **Deployment Ready**: Render-compatible fullstack structure

---

## 🚀 Installation

### 1. Clone the Repo
git clone https://github.com/Sanghanmol/connect-four.git

### 2. Install dependencies:
npm install

### 3. Configure environment variables:
 Add the required environment variables (e.g., database connection details, port).

### 4. Start the backend and frontend server:
npm start

### 5. Open your browser: 
👉 http://localhost:8080

---

## 🕹 Usage
- 📝 Enter your username to join a game.
- ⏳ If another player joins, you’re paired for a real-time match.
- 🤖 If no one joins in 10 seconds, you’ll play against a bot.
- 🏆 On game end, the leaderboard is updated.
- 🔁 After win/loss, return to join screen automatically in 3 seconds.

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgements
Built with ❤️ using MERN Stack, WebSockets, and a passion for multiplayer games.