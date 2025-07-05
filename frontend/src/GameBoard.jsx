import React from 'react';

function GameBoard({ board = [], move }) {
  const handleClick = (col) => {
    move(col);
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 60px)',
          gap: '6px',
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '12px',
        }}
      >
        {[...Array(6)].map((_, rowIdx) =>
          [...Array(7)].map((_, colIdx) => {
            const cell = board[rowIdx]?.[colIdx];
            const color =
              cell === 0
                ? 'danger'
                : cell === 1
                ? 'primary'
                : 'light';

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleClick(colIdx)}
                className={`border rounded-circle bg-${color}`}
                style={{
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer',
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default GameBoard;
