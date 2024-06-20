import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './Starting11.css';


const Starting11 = ({ user }) => {
  const [startingEleven, setStartingEleven] = useState({});
  const navigate = useNavigate();
  
/**
   * Fetches the user's starting eleven from the server.
   */
  useEffect(() => {
    if (user) {
      console.log('Fetching starting eleven for user:', user.username);
      fetch(`https://football-gladiators-project-4b40aafa12b3.herokuapp.com/api/startingeleven/${user.username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const formation = {};
          data.forEach(player => {
            formation[player.position] = player;
            
          });
          setStartingEleven(formation);
        })
        .catch(error => console.error('Error fetching starting eleven:', error));
    }
  }, [user]);

  /**
   * Navigates to the favorites page to add a player to favorites.
   * @param {string} position - The position of the player.
   */
  const handleAddToFavourites = (position) => {
    navigate('/favourites', { state: { from: 'startingeleven', position } });
  };
  
 /**
   * Removes a player from the starting eleven.
   * @param {string} position - The position of the player to remove.
   */
  const handleRemovePlayer = (position) => {
    fetch(`https://football-gladiators-project-4b40aafa12b3.herokuapp.com/api/startingeleven/${user.username}/${position}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Update the state to reflect the removed player
      setStartingEleven(prevState => {
        const updatedFormation = { ...prevState };
        delete updatedFormation[position];
        return updatedFormation;
      });
    })
    .catch(error => console.error('Error removing player:', error));
  };

  const positionAbbreviations = {
    forward1: 'LW',
    forward2: 'ST',
    forward3: 'RW',
    midfield1: 'CM',
    midfield2: 'CAM',
    midfield3: 'CM',
    defense1: 'LB',
    defense2: 'CB',
    defense3: 'CB',
    defense4: 'RB',
    goalkeeper: 'GK'
  };

  return (
    <div className="starting11-container">
     
      <div className="lineup">
        <h1 className = "lineup-title">{user ? `${user.username}'s team` : 'Please log in'}</h1>
        <div className="formation">
          <div className="forward">
            {['forward1', 'forward2', 'forward3'].map((position) => (
              <div key={position} className={position === 'forward2' ? 'middle-attacker' : 'card2'}>
                {startingEleven[position] ? (
                  <div className="display-card">
                    <img className="player-image" src={startingEleven[position].picture} alt={startingEleven[position].name} width="100" />
                    <p className="player-name1">{startingEleven[position].name}</p>
                    <p><strong>{positionAbbreviations[position]}</strong></p>
                    <button className = "delete-button" onClick={() => handleRemovePlayer(position)}><DeleteIcon /></button>
                  </div>
                ) : (
                  <>
                    <div className="position">{positionAbbreviations[position]}</div>
                    <AddIcon onClick={() => handleAddToFavourites(position)} className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="midfield">
            {['midfield1', 'midfield2', 'midfield3'].map((position) => (
              <div key={position} className={position === 'midfield2' ? 'middle-midfielder' : 'card2'}>
                {startingEleven[position] ? (
                  <div className="display-card">
                    <img className="player-image" src={startingEleven[position].picture} alt={startingEleven[position].name} width="100" />
                    <p className="player-name1">{startingEleven[position].name}</p>
                    <p><strong>{positionAbbreviations[position]}</strong></p>
                    <button className = "delete-button" onClick={() => handleRemovePlayer(position)}><DeleteIcon /></button>
                  </div>
                ) : (
                  <>
                    <div className="position">{positionAbbreviations[position]}</div>
                    <AddIcon onClick={() => handleAddToFavourites(position)} className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="defense">
            {['defense1', 'defense2', 'defense3', 'defense4'].map((position) => (
              <div key={position} className="card2">
                {startingEleven[position] ? (
                  <div className="display-card">
                    <img className="player-image" src={startingEleven[position].picture} alt={startingEleven[position].name} width="100" />
                    <p className="player-name1">{startingEleven[position].name}</p>
                    <p><strong>{positionAbbreviations[position]}</strong></p>
                    <button className = "delete-button" onClick={() => handleRemovePlayer(position)}><DeleteIcon /></button>
                  </div>
                ) : (
                  <>
                    <div className="position">{positionAbbreviations[position]}</div>
                    <AddIcon onClick={() => handleAddToFavourites(position)} className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="goalkeeper">
            <div className="card2">
              {startingEleven['goalkeeper'] ? (
                <div className="display-card">
                 
                  <img className="player-image" src={startingEleven['goalkeeper'].picture} alt={startingEleven['goalkeeper'].name} width="100" />
                  <p className="player-name1">{startingEleven['goalkeeper'].name}</p>
                  <p><strong>{positionAbbreviations["goalkeeper"]}</strong></p>
                  <button className = "delete-button" onClick={() => handleRemovePlayer('goalkeeper')}><DeleteIcon /></button>
                </div>
              ) : (
                <>
                  <div className="position">{positionAbbreviations["goalkeeper"]}</div>
                  <AddIcon onClick={() => handleAddToFavourites('goalkeeper')} className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Starting11;
