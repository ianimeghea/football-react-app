import React, { useState, useEffect } from 'react';
import './Favourites.css'; 
import { useLocation } from 'react-router-dom';
import { getUserFavorites } from './api'; // Import the function to fetch user favorites

const Favourites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const fromStarting11 = location.state?.from === 'startingeleven';

  useEffect(() => {
    if (user) {
      // Fetch user favorites when the component is loaded
      getUserFavorites(user.username)
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch((error) => console.error('Error fetching user favorites:', error));
    }
  }, [user]);

  const handleAddToTeam = (player_id) => {
    console.log('Add player to team:', player_id);
  }

  if (!user) {
    return <p className="empty-message">Please log in to view favorites.</p>;
  }

  if (loading) {
    return <p className="empty-message">Loading...</p>;
  }

  const hasFavorites = favorites.length > 0;

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
              <p>{user.username}</p>
              {fromStarting11 && <button className="add-to-team" onClick={() => handleAddToTeam(player.player_id)}>add to team</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
