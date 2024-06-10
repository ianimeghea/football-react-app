import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchBar from './searchBar.js';
import './Home.css';

const Home = ({ setSelectedPlayer,user, favorites, setFavorites }) =>  {
  
  return (
    <>
    <div className = "container">
    <div className = "main">
      <div className = "row">
        <div className="card1">
          <h2 className="card-title">
          Football: The Beautiful Game
          </h2>
          <p className="card-text">
          Football, often referred to as "the beautiful game," is more than just a sport; it's a global phenomenon that unites people from all walks of life. With its rich history and thrilling matches, football has the power to evoke passion, joy, and camaraderie among fans. Whether it's the excitement of a last-minute goal or the elegance of a perfectly executed pass, football continues to captivate millions, creating unforgettable moments and lifelong memories.
          </p>
      
        </div>
        <div className = "icon1">
          <SportsSoccerIcon style={{fontSize : 130}} />

        </div>
        
      </div>
      <div className = "row">
        <div className = "icon">
          <StarIcon style={{fontSize : 130}} />

        </div>
        <div className="card1">
          <h2 className="card-title">
          Favourite Your Football Heroes
          </h2>
          <p className="card-text">
          With the Football Gladiators app, you can take your love for the game to the next level by favouriting your favourite players. Dive deep into player profiles, explore their stats, and add them to your personal list of top football stars. Whether it's the legendary skills of past icons or the brilliance of today's superstars, this feature allows you to keep track of the players who inspire you the most, celebrating their achievements and following their careers closely.
          </p>
      
        </div>

      </div>
      <div className = "row">
        <div className="card1">
          <h2 className="card-title">
          Create and Share Your Dream Team
          </h2>
          <p className="card-text">
          Unleash your creativity and football knowledge by creating your ultimate starting lineup with Football Gladiators. Choose from a vast array of players to assemble your dream team, mixing legends from the past with current football prodigies. Once you've crafted your ideal squad, share it with fellow football enthusiasts within the app. Compare lineups, engage in discussions, and showcase your football expertise to the community. Football Gladiators is the perfect platform to connect, compete, and celebrate the game we all love.
          </p>
      
        </div>
        <div className = "icon1">
          <GroupsIcon style={{fontSize : 130}} />

        </div>
      
      </div>
      
    </div>
    
    <div className = "searchBar"> 
      <SearchBar user={user} favorites={favorites} setFavorites={setFavorites} setSelectedPlayer={setSelectedPlayer}/>

    </div>
    </div>
    </>
    
    
  );
}

export default Home;
