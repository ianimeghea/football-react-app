import React, { useEffect, useState } from 'react';
import './Favourites.css'; // Ensure to create a corresponding CSS file

const Favourites = ({favorites}) => {
  const [favourites, setFavourites] = useState([]);

  
  return (
    <div className="favourites-container">
      {favorites.map((player) => (
        <div key={player.player_id} className="card">
          <div className="card-content">
            <h3>{player.name}</h3>
            <p>Team: {player.team}</p>
            <p>Position: {player.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favourites;