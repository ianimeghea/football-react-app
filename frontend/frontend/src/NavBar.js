import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Football Gladiator</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favourites">Favourites</Link></li>
        <li><Link to="/startingeleven">Starting 11</Link></li>
        <li className="login">Login/Register</li>
      </ul>
    </nav>
  );
};

export default Navbar;