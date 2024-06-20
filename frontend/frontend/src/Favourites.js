import React, { useState, useEffect } from 'react';
import './Favourites.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserFavorites, removeFromFavorites } from './api';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Favourites = ({ user, setSelectedPlayer, startingEleven }) => {
  const [favorites, setFavorites] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const fromStarting11 = location.state?.from === 'startingeleven';
  const position = location.state?.position;

  // Function to handle navigation to more details page
  const handleMoreDetails = (player) => {
    setSelectedPlayer(player);
    navigate(`/player/${player.name}`, { state: { from: 'favourites' } });
  };

  // Function to handle navigation to statistics page
  const handleViewStatistics = (player) => {
    navigate(`/statistics`, { state: { player } });
  };

  // Fetch favorites data on component mount
  useEffect(() => {
    if (user) {
      getUserFavorites(user.username)
        .then((data) => {
          setFavorites(data);
        })
        .catch((error) => console.error('Error fetching user favorites:', error));
    }
  }, [user]);

  // Function to add player to starting eleven
  const handleAddToTeam = (player_id) => {
    if (fromStarting11 && position) {
      // First, fetch the current starting eleven to check if the player is already on the team
      fetch(`https://football-gladiators-project-4b40aafa12b3.herokuapp.com/api/startingeleven/${user.username}`)
        .then(response => response.json())
        .then(startingEleven => {
          // Check if the player is already in the starting eleven
          const playerExists = startingEleven.some(player => player.player_id === player_id);
          
          if (playerExists) {
            alert('Player already in team');
          } else {
            // If the player is not in the list, proceed to add them
            fetch(`https://football-gladiators-project-4b40aafa12b3.herokuapp.com/api/startingeleven/${user.username}`, {
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
        })
        .catch(error => console.error('Error fetching starting eleven:', error));
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
            {/* Material-UI delete icon for removing from favorites */}
            <IconButton>
              <DeleteIcon className="remove-from-favorites"
              onClick={() => handleRemoveFromFavorites(player.player_id)} />
            </IconButton>
            <div className="card-content">
              <h3>{player.name}</h3>
              <p><strong>{player.shirt_number}</strong></p>
              <p><strong>Team:</strong> {player.team.replace('_Retired Soccer', "Retired")}</p>
              <p><strong>Position:</strong> {player.position}</p>
              <img className="player-image" src={player.picture} alt={player.name} width="130" />
              {/* Button to add player to starting eleven */}
              {fromStarting11 && <button className="add-to-team" onClick={() => handleAddToTeam(player.player_id)}>Add to team</button>}
              {/* Button to view more details */}
              <button className="more-details" onClick={() => handleMoreDetails(player)}>More details</button>
              {/* Button to view statistics */}
              <button className="more-details" onClick={() => handleViewStatistics(player)}>Statistics</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
