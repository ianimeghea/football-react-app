import React, { useState, useEffect } from 'react';
import './Favourites.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserFavorites, removeFromFavorites } from './api';

const Favourites = ({ user, setSelectedPlayer }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const fromStarting11 = location.state?.from === 'startingeleven';
  const position = location.state?.position;

  // Function to handle navigation to more details page
  const handleMoreDetails = (player) => {
    setSelectedPlayer(player);
    navigate(`/player/${player.name}`, { state: { from: 'favourites' } });
  };

  // Fetch favorites data on component mount
  useEffect(() => {
    if (user) {
      getUserFavorites(user.username)
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch((error) => console.error('Error fetching user favorites:', error));
    }
  }, [user]);

  // Function to add player to starting eleven
  const handleAddToTeam = (player_id) => {
    if (fromStarting11 && position) {
      fetch(`http://127.0.0.1:5000/api/startingeleven/${user.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ position, player_id })
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Player added to starting eleven') {
            navigate('/startingeleven');
            console.log(data);
          } else {
            console.error('Error adding player to starting eleven:', data);
          }
        })
        .catch(error => console.error('Error adding player to starting eleven:', error));
    }
  };

  // Function to remove player from favorites
  const handleRemoveFromFavorites = (player_id) => {
    removeFromFavorites(user.username, player_id)
      .then(() => {
        setFavorites(favorites.filter(player => player.player_id !== player_id));
      })
      .catch(error => console.error('Error removing player from favorites:', error));
  };

  // Render loading message if data is loading
  if (loading) {
    return <p className="empty-message">Loading...</p>;
  }

  // Render empty message if no user is logged in
  if (!user) {
    return <p className="empty-message">Please log in to view favorites.</p>;
  }

  const hasFavorites = favorites.length > 0;

  return (
    <div>
      {/* Render message if no favorites are present */}
      {!hasFavorites && (
        <p className="empty-message">You currently have no favorites.</p>
      )}
      {/* Render each favorite player card */}
      <div className="favourites-container">
        {hasFavorites && favorites.map((player) => (
          <div key={player.player_id} className="card">
            <div className="card-content">
              <h3>{player.name}</h3>
              <p><strong>Team:</strong> {player.team.replace('_Retired Soccer', "Retired")}</p>
              <p><strong>Position:</strong> {player.position}</p>
              <img className="player-image" src={player.picture} alt={player.name} width="130" />
              {/* Button to remove player from favorites */}
              <button className="remove-from-favorites" onClick={() => handleRemoveFromFavorites(player.player_id)}>Remove from favorites</button>
              {/* Button to add player to starting eleven */}
              {fromStarting11 && <button className="add-to-team" onClick={() => handleAddToTeam(player.player_id)}>Add to team</button>}
              {/* Button to view more details */}
              <button className="more-details" onClick={() => handleMoreDetails(player)}>More details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
