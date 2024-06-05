import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask backend on component mount
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/players'); // Adjust port if necessary
        setPlayers(response.data);
        console.log("Player data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div><h1>Player List</h1>
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          {player.name} - {player.team}
        </li>
      ))}
    </ul>
  </div>
);
};

export default PlayerList;