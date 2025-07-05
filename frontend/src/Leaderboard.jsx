import React, { useEffect, useState } from 'react';

function Leaderboard({ refreshTrigger }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8080/leaderboard')
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="card shadow p-3" 
    style={{
        width: '100%',            
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '12px',
      }}
      >
      <h5 className="mb-3 text-center text-danger">🏆 Leaderboard</h5>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table className="table table-striped table-sm mb-0">
          <thead className="sticky-top bg-white">
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((player, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{player.username}</td>
                  <td>{player.wins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default Leaderboard;
