import React, { useState } from 'react';
import './searchBar.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

/**
 * Component for rendering a search bar.
 * @param {Object} props - The component props.
 * @param {Object} props.user - The current user data.
 * @param {Function} props.setSelectedPlayer - Function to set the selected player.
 * @param {Array} props.favorites - Array of favorite players.
 * @param {Function} props.setFavorites - Function to set the favorite players.
 * @returns {JSX.Element} Search bar component.
 */
const SearchBar = ({ user, setSelectedPlayer, favorites, setFavorites }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  
  /**
   * Handles the input change in the search bar.
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  /**
   * Handles key press events in the search bar.
   * @param {Object} event - The key press event.
   */
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
        const data = await response.json();
        const footballPlayers = data.player.filter(player => player.strSport === 'Soccer');
        setResults(footballPlayers);
        console.log('Search results:', footballPlayers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  /**
   * Toggles a player's favorite status.
   * @param {Object} player - The player object.
   */
  const toggleFavorite = async (player) => {
    if (!user) {
      alert("Please log in to favorite players");
      return;
    }
    
 
    const playerData = {
      player_id: player.idPlayer,
      name: player.strPlayer,
      team: player.strTeam,
      position: player.strPosition,
      picture: player.strCutout,
      shirt_number: player.strNumber, 
      nationality: player.strNationality,
      birth_date: player.dateBorn, 
      height: player.strHeight,
      weight: player.strWeight,
      description: player.strDescriptionEN 
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
      console.log('Adding player to favorites:', playerData);
      console.log('Username used in request:', user);
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

  /**
   * Handles the click event for viewing more details of a player.
   * @param {Object} player - The player object.
   */
  const handleMoreDetails = (player) => {
    setSelectedPlayer(player);
    navigate(`/player/${player.strPlayer}`);
  };

  return (
    <div className="search-bar">
      <h1 className="bar-title">Search for your favourite players <SearchIcon style={{ fontSize: 28, verticalAlign: 'middle', marginLeft: '5px' }} /></h1>
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
                <strong>Team:</strong> {player.strTeam.replace('_Retired Soccer', "Retired")}
              </div>
              <div>
                <strong>Position:</strong> {player.strPosition}
              </div>
            </div>
            <div className="player-image">
              {player.strCutout ? (
                <img src={player.strCutout} width="100" alt={player.strPlayer} />
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
              <button className="more-details" onClick={() => handleMoreDetails(player)}>More Details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
