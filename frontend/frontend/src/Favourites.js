import React, { useState, useEffect } from 'react';
import './Favourites.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserFavorites } from './api';

const Favourites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const fromStarting11 = location.state?.from === 'startingeleven';
  const position = location.state?.position;

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
      <div className="favourites-container">
        {hasFavorites && favorites.map((player) => (
          <div key={player.player_id} className="card">
            <div className="card-content">
              <h3>{player.name}</h3>
              <p><strong>Team:</strong> {player.team}</p>
              <p><strong>Position:</strong> {player.position}</p>
              <img className="player-image" src={player.picture} alt={player.name} width="130" />
              
              {fromStarting11 && <button className="add-to-team" onClick={() => handleAddToTeam(player.player_id)}>add to team</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
