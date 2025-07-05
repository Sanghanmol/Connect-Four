const { v4: uuidv4 } = require('uuid');
const Game = require('./models/Game');
const Leaderboard = require('./models/Leaderboard');
const sendAnalytics = require('./kafka');

let waitingPlayer = null;
const activeGames = {};

function getEmptyBoard() {
  return Array.from({ length: 6 }, () => Array(7).fill(null));
}

function checkWin(board) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const val = board[r][c];
      if (val === null) continue;
      for (let [dr, dc] of dirs) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr*i, nc = c + dc*i;
          if (nr < 0 || nr >= 6 || nc < 0 || nc >= 7 || board[nr][nc] !== val) break;
          count++;
        }
        if (count === 4) return val;
      }
    }
  }
  return null;
}

function getAvailableRow(board, col) {
  for (let r = 5; r >= 0; r--) {
    if (board[r][col] === null) return r;
  }
  return -1;
}

async function updateLeaderboard(winner) {
  await Leaderboard.findOneAndUpdate(
    { username: winner },
    { $inc: { wins: 1 } },
    { upsert: true }
  );
}

function socketHandler(io) {
  io.on('connection', (socket) => {
    socket.on('join', ({ username }) => {
      socket.username = username;
      if (waitingPlayer && waitingPlayer.id !== socket.id) {
        startGame([waitingPlayer, socket]);
        waitingPlayer = null;
      } else {
        waitingPlayer = socket;
        setTimeout(() => {
          if (waitingPlayer === socket) {
            const bot = { emit: () => {}, id: 'bot', username: 'BOT' };
            startGame([socket, bot], true);
            waitingPlayer = null;
          }
        }, 10000);
      }
    });

    socket.on('move', ({ gameId, col }) => handleMove(gameId, col, socket));

    socket.on('disconnect', () => {
      if (waitingPlayer?.id === socket.id) waitingPlayer = null;
    });
  });

  function startGame(players, isBot = false) {
    const gameId = uuidv4();
    const board = getEmptyBoard();
    activeGames[gameId] = {
      players,
      board,
      turn: 0,
      isBot,
      startTime: Date.now(),
    };
    players.forEach((p, idx) => p?.emit?.('start', { gameId, playerIndex: idx }));
  }

  async function handleMove(gameId, col, socket) {
    const game = activeGames[gameId];
    if (!game) return;
    const { board, turn, players } = game;
    const row = getAvailableRow(board, col);
    if (row === -1) return;
    board[row][col] = turn;

    const winner = checkWin(board);
    players.forEach((p, i) => p?.emit?.('update', { board, turn: 1 - turn, winner }));

    if (winner !== null) {
      const winnerName = players[winner].username;
      const duration = Date.now() - game.startTime;
      await updateLeaderboard(winnerName);
      await Game.create({ players: players.map(p => p.username), board, winner: winnerName, duration });
      await sendAnalytics({ type: 'game_over', players: players.map(p => p.username), winner: winnerName, duration });
      delete activeGames[gameId];
    } else {
      game.turn = 1 - turn;
      if (game.isBot && game.turn === 1) {
        setTimeout(() => {
          for (let c = 0; c < 7; c++) {
            const r = getAvailableRow(board, c);
            if (r !== -1) {
              handleMove(gameId, c, players[0]);
              break;
            }
          }
        }, 300);
      }
    }
  }
}

module.exports = socketHandler;