import React, { useState, useEffect } from 'react';
import './searchBar.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const SearchBar = ({ user }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log('Username passed to SearchBar:', user);  // Log the username
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/${user.username}/players`);
        const data = await response.json();
        if (response.ok) {
          setFavorites(data);
        } else {
          console.error('Error fetching favorite players:', data.message);
        }
      } catch (error) {
        console.error('Error fetching favorite players:', error);
      }
    };
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
        const data = await response.json();
        const footballPlayers = data.player.filter(player => player.strSport === 'Soccer');
        setResults(footballPlayers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const toggleFavorite = async (player) => {
    const playerData = {
      player_id: player.idPlayer,
      name: player.strPlayer,
      team: player.strTeam,
      position: player.strPosition
    };

    if (favorites.some(fav => fav.player_id === player.idPlayer)) {
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.player_id !== player.idPlayer));
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/${user.username}/favorite_players`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ player_id: player.idPlayer }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Player removed from favorites:', data);
        } else {
          console.error('Error removing player from favorites:', data.message);
        }
      } catch (error) {
        console.error('Error during removing favorite:', error);
      }
    } else {
      console.log('Adding player to favorites:', playerData);  // Log the player data
      console.log('Username used in request:', user);  // Log the username used in request
      setFavorites(prevFavorites => [...prevFavorites, playerData]);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/${user.username}/favorite_players`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Player added to favorites:', data);
        } else {
          console.log(user);
          console.error('Error adding player to favorites:', data.message);
        }
      } catch (error) {
        console.error('Error during adding favorite:', error);
      }
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search players..."
      />
      <ul className="search-results">
        {results.map((player, index) => (
          <li key={index} className="result">
            <div className="player-info">
              <div>
                <strong>Name:</strong> {player.strPlayer}
              </div>
              <div>
                <strong>Team:</strong> {player.strTeam}
              </div>
              <div>
                <strong>Position:</strong> {player.strPosition}
              </div>
            </div>
            <div className="player-image">
              {player.strThumb ? (
                <img src={player.strThumb} width="100" alt={player.strPlayer} />
              ) : (
                <div>No image available</div>
              )}
            </div>
            <div className="player-actions">
              {favorites.some(fav => fav.player_id === player.idPlayer) ? (
                <StarIcon onClick={() => toggleFavorite(player)} style={{ fontSize: 50 }} />
              ) : (
                <StarBorderIcon onClick={() => toggleFavorite(player)} style={{ fontSize: 50 }} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
