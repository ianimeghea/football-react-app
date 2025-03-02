import React from 'react';
import './playerDetails.css';  // Ensure you import a CSS file for style
import { useLocation } from 'react-router-dom';
import { differenceInYears } from 'date-fns';



const PlayerDetails = ({ player }) => {
  const location = useLocation();
  const fromFavourites = location.state?.from === 'favourites';
  const dateOfBirth = player ? new Date(player.dateBorn) : null;
  const playerAge = dateOfBirth ? differenceInYears(new Date(), dateOfBirth) : null;
  const playerAge2 = player ? differenceInYears(new Date(), player.birth_date) : null;
  
  
  if (!player) {
    return <div>Loading...</div>;  // Display while player data is loading
  }
  if(player.strTeam === "_Retired Soccer"){
    player.strTeam = "Retired"
  }
  if(player.team === "_Retired Soccer"){
    player.team = "Retired"
  }
  
  return (
    <>
    {fromFavourites ? (<div className="player-details">
    <div className="player-card">
      <h1 className='player-name'>{player.name}</h1>
      {player.picture && <img src={player.picture} alt={player.name} />}
      <p><strong>Team:</strong> {player.team !== "0" ? player.team : 'Information not available'}</p>
      <p><strong>Position:</strong> {player.position !== "0" ? player.position : 'Information not available'}</p>
      <p><strong>Age:</strong> {playerAge2}</p>
      <p><strong>Nationality:</strong> {player.nationality !== "0" ? player.nationality : 'Information not available'}</p>
      <p><strong>Birth Date:</strong> {player.birth_date !== "0" ? player.birth_date : 'Information not available'}</p>
      <p><strong>Height:</strong> {player.height !== "0" ? player.height : 'Information not available'}</p>
      
      <p><strong>Description:</strong> {player.description !== "0" ? player.description : 'Information not available'}</p>
      
      

    </div>
  </div>
  ) :
    (<div className="player-details">
    <div className="player-card">
      <h1 className="player-name">{player.strPlayer}</h1>
      <img src={player.strRender ? player.strRender : player.strCutout} alt={player.strPlayer} />
      <p><strong>Team:</strong> {player.strTeam !== "0" ? player.strTeam : 'Information not available'}</p>
      <p><strong>Position:</strong> {player.strPosition !== "0" ? player.strPosition : 'Information not available'}</p>
      <p><strong>Age:</strong> {playerAge}</p>
      <p><strong>Nationality:</strong> {player.strNationality !== "0" ? player.strNationality : 'Information not available'}</p>
      <p><strong>Birth Date:</strong> {player.dateBorn !== "0" ? player.dateBorn : 'Information not available'}</p>
      <p><strong>Height:</strong> {player.strHeight !== "0" ? player.strHeight : 'Information not available'}</p>
     
      <p><strong>Description:</strong> {player.strDescriptionEN !== "0" ? player.strDescriptionEN : 'Information not available'}</p>
      

      

    </div>
  </div>)}
    
    </>
    
  );
};

export default PlayerDetails;
