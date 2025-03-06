import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header-container">
       <h1>Welcome To Jaied</h1> 
      <nav>
        <ul>
          <li><Link to="/produits">Produits</Link></li>
         
        </ul>
      </nav>
    </header>
  );
};

export default Header;
