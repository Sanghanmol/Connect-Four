import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import GameBoard from './GameBoard.jsx';
import Leaderboard from './Leaderboard.jsx';

const socket = io(
  import.meta.env.PROD
    ? window.location.origin
    : 'http://localhost:8080'
);

function App() {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [turn, setTurn] = useState(0);
  const [gameId, setGameId] = useState('');
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on('start', ({ gameId, playerIndex }) => {
      setGameId(gameId);
      setPlayerIndex(playerIndex);
      setStarted(true);
      setWinner(null);
    });

    socket.on('update', ({ board, turn, winner }) => {
      setBoard(board);
      setTurn(turn);
      setWinner(winner);
    });

    return () => {
      socket.off('start');
      socket.off('update');
    };
  }, []);

  useEffect(() => {
    if (winner !== null) {
      const timer = setTimeout(() => {
        setStarted(false);
        setGameId('');
        setBoard([]);
        setWinner(null);
        setTurn(0);
        setUsername('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [winner]);

  const joinGame = () => {
    if (username.trim()) {
      socket.emit('join', { username });
    }
  };

  const makeMove = (col) => {
    if (turn === playerIndex && winner === null) {
      socket.emit('move', { gameId, col });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-primary display-5">
        🎯 Connect Four
      </h2>

      {!started ? (
        <div className="d-flex justify-content-center">
          <div
            className="card p-4 shadow-lg border-0 bg-light w-100"
            style={{ maxWidth: '500px' }}
          >
            <h4 className="mb-4 text-center">Join the Game</h4>
            <input
              className="form-control mb-3"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="btn btn-warning w-100" onClick={joinGame}>
              🚀 Start Playing
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-4 mt-4">
            <span
              className={`badge py-2 px-4 fs-5 ${winner !== null
                ? winner === playerIndex
                  ? 'bg-success'
                  : 'bg-danger'
                : turn === playerIndex
                  ? 'bg-warning'
                  : 'bg-secondary'
                }`}
            >
              {winner !== null
                ? winner === playerIndex
                  ? '🎉 You Win!'
                  : '😢 You Lose!'
                : turn === playerIndex
                  ? "✅ Your Turn"
                  : "⌛ Opponent's Turn"}
            </span>
          </div>

          <GameBoard board={board} move={makeMove} />
        </>
      )}

      {!started && (
        <div className="mt-5">
          <div className="card shadow-lg border-0 p-4 bg-white">
            <Leaderboard refreshTrigger={winner} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
