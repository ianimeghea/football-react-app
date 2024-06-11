import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer__bottom">
        <p className="footer__copyright">© {new Date().getFullYear()} Football Gladiators. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
