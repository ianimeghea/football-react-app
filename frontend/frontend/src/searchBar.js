import React, { useState } from 'react';
import './searchBar.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({setSelectedPlayer}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
 
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (player) => {
    setSelectedPlayer(player);
    console.log('Selected Player Details:', player);
    navigate(`/player/${player.id}`);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(`http://127.0.1:5000/search?q=${query}`);
        const data = await response.json();
        const footballPlayers = data.player.filter(player => player.strSport === 'Soccer');
        setResults(footballPlayers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  const toggleFavorite = (player) => {
    if (favorites.includes(player)) {
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav !== player));
      // Here you can send a request to your backend to remove the player from the favorites database
      // Example: fetch(`http://your-backend-url/remove-from-favorites`, { method: 'POST', body: JSON.stringify(player) });
    } else {
      setFavorites(prevFavorites => [...prevFavorites, player]);
      // Here you can send a request to your backend to add the player to the favorites database
      // Example: fetch(`http://your-backend-url/add-to-favorites`, { method: 'POST', body: JSON.stringify(player) });
    }
  };

  return (
    <div className="search-bar">
      <h1 className = "bar-title">Search for your favourite players <SearchIcon style={{ fontSize: 28, verticalAlign: 'middle', marginLeft: '5px' }} /></h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search players..."
      />
      <ul className="search-results">
        {results.map((player, index) => (
          <li key={index} className = "result">
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
                <img src={player.strThumb}  width="100" />
              ) : (
                <div>No image available</div>
              )}
            </div>
            <div className="player-actions">
              {favorites.includes(player) ? (
                <StarIcon onClick={() => toggleFavorite(player)} style={{fontSize:50}} />
              ) : (
                <StarBorderIcon onClick={() => toggleFavorite(player)} style={{fontSize:50}}/>
              )}
              <button className = "more-details" onClick={() => handleClick(player)}>More Details</button>
            
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
