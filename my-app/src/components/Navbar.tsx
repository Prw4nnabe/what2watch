import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';
import ToggleTheme from './ThemeToggle';
import '../css/Navbar.css';
import { HiLogin } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import { GiLetterBomb } from 'react-icons/gi';

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setShowNavbar(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={navbarRef}>
        <div className="logo">
          <Link to="/what2watch/">
            <img src="/what2watch/nav-logo.png" alt="Logo" />
          </Link>
        </div>
        
        <div className="menu-icon">
          <input
            type="checkbox"
            id="checkbox"
            checked={showNavbar}
            onChange={() => setShowNavbar(!showNavbar)}
          />
          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </div>
        <div className={`nav-elements ${showNavbar && 'active'}`}>
          <NavLink
            to="/movielist"
            className="navbar-link"
            onClick={closeNavbar}
          >
            MovieList
          </NavLink>
          <NavLink
            to="/actorlist"
            className="navbar-link"
            onClick={closeNavbar}
          >
            Actorlist
          </NavLink>
          <div className="search">
            <SearchBar onClose={closeNavbar} />
          </div>
          <div className="auth">
            <Link to="/login" className="auth-link" onClick={closeNavbar}>
              <HiLogin /> Login
            </Link>
            <Link to="/register" className="auth-link" onClick={closeNavbar}>
              <GiLetterBomb /> Register
            </Link>
          </div>
          <div className="Toggl">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
