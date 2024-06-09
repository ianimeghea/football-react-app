import React from 'react';
import './Favourites.css'; 
import { useLocation } from 'react-router-dom';

const Favourites = ({ favorites }) => {
  // Check if there are favorites
  const hasFavorites = favorites.length > 0;
  const location = useLocation();
  const fromStarting11 = location.state?.from === 'startingeleven';

  const handleAddToTeam = (player_id) => {
    console.log('Add player to team:', player_id);
  }

  return (
    <div>
      
      {!hasFavorites && (
        <p className="empty-message">You currently have no favorites.</p>
      )}

      {/* Container for favorites */}
      <div className="favourites-container">
        {/* Display favorites if available */}
        {hasFavorites && favorites.map((player) => (
          <div key={player.player_id} className="card">
            <div className="card-content">
              <h3>{player.name}</h3>
              <p>Team: {player.team}</p>
              <p>Position: {player.position}</p>
              {fromStarting11 && <button className = "add-to-team" onClick={() => handleAddToTeam(player.player_id)}>add to team</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
