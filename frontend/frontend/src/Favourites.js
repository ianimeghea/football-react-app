import React, { useEffect, useState } from 'react';
import './Favourites.css'; // Ensure to create a corresponding CSS file

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Fetch the favourite players for the logged-in user
    // Placeholder for actual fetch logic
    // Assuming you have an API endpoint to get the user's favourites
    // fetch('/api/user/favourites')
    //   .then(response => response.json())
    //   .then(data => setFavourites(data))
    //   .catch(error => console.error('Error fetching favourites:', error));

    // Placeholder favourites data for testing
    const dummyFavourites = [
      { id: 1, name: 'Player 1', team: 'Team A', position: 'Forward' },
      { id: 2, name: 'Player 2', team: 'Team B', position: 'Midfielder' },
      { id: 3, name: 'Player 3', team: 'Team C', position: 'Defender' },
      { id: 4, name: 'Player 4', team: 'Team D', position: 'Goalkeeper' },
      { id: 5, name: 'Player 5', team: 'Team E', position: 'Forward' },
    ];
    setFavourites(dummyFavourites);
  }, []);

  return (
    <div className="favourites-container">
      {favourites.map((player) => (
        <div key={player.id} className="card">
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