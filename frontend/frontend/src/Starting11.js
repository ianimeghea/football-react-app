import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import './Starting11.css';

const Starting11 = () => {

    const navigate = useNavigate();

    const handleAddToFavourites = () => {
      navigate('/favourites', { state: { from: 'startingeleven' } });
    };
  return (
    <div className="starting11-container">
      <div className="lineup">
        <div className="formation">
          <div className="forward">
            {[1, 2, 3].map((index) => (
              <div key={index} className={index === 2 ? 'middle-attacker' : 'card2'}>
                Forward {index}
                
                  <AddIcon onClick={handleAddToFavourites} className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                
              </div>
            ))}
          </div>
          <div className="midfield">
            {[1, 2, 3].map((index) => (
              <div key={index} className={index === 2 ? 'middle-midfielder' : 'card2'}>
                Midfielder {index}
                <Link to="/favourites">
                  <AddIcon className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                </Link>
              </div>
            ))}
          </div>
          <div className="defense">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="card2">
                Defender {index}
                <Link to="/favourites">
                  <AddIcon className="add-icon" style={{ fontSize: 70, color: 'black' }} />
                </Link>
              </div>
            ))}
          </div>
          <div className="goalkeeper">
            <div className="card2">
              Goalkeeper
              <Link to="/favourites">
                <AddIcon className="add-icon" style={{ fontSize: 70, color: 'black' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Starting11;
