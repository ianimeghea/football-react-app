import React from 'react';
import './playerDetails.css';  // Ensure you import a CSS file for styles

const PlayerDetails = ({ player }) => {
  if (!player) {
    return <div>Loading...</div>;  // Display while player data is loading
  }

  return (
    <div className="player-details">
      <div className="player-card">
        <h1>{player.strPlayer}</h1>
        {player.strThumb && <img src={player.strThumb} alt={player.strPlayer} />}
        <p><strong>Team:</strong> {player.strTeam !== "0" ? player.strTeam : 'Information not available'}</p>
        <p><strong>Position:</strong> {player.strPosition !== "0" ? player.strPosition : 'Information not available'}</p>
        <p><strong>Nationality:</strong> {player.strNationality !== "0" ? player.strNationality : 'Information not available'}</p>
        <p><strong>Birth Date:</strong> {player.dateBorn !== "0" ? player.dateBorn : 'Information not available'}</p>
        <p><strong>Height:</strong> {player.strHeight !== "0" ? player.strHeight : 'Information not available'}</p>
        <p><strong>Weight:</strong> {player.strWeight !== "0" ? player.strWeight : 'Information not available'}</p>
        <p><strong>Description:</strong> {player.strDescriptionEN !== "0" ? player.strDescriptionEN : 'Information not available'}</p>
      </div>
    </div>
  );
};

export default PlayerDetails;
