import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';
import '../css/Navbar.css';
import { HiLogin } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import { GiLetterBomb } from 'react-icons/gi';

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src="/what2watch/nav-logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <HiLogin />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <Link to="/movielist" className="navbar-link">
            MovieList
          </Link>
          <Link to="/actorlist" className="navbar-link">
            Actorlist
          </Link>
          <div className="search">
            <div className="search-icon">
            </div>
            <SearchBar />
          </div>
          <div className="auth">
            <Link to="/login" className="auth-link">
              <HiLogin />Login
            </Link>
            <Link to="/register" className="auth-link">
              <GiLetterBomb /> Register
            </Link>
          </div>
        </div>
      </div>
      
    </nav>
  );
}

export default Navbar;
