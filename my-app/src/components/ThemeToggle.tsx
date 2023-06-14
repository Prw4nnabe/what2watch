import React, { useState, useEffect } from 'react';
import '../css/Themetoggle.css';

const Themetoggle: React.FC = () => {
  const storedTheme = localStorage.getItem('theme');
  const [darkMode, setDarkMode] = useState(storedTheme === 'dark');

  useEffect(() => {
    const themeClass = darkMode ? 'dark' : 'light';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(themeClass);
    localStorage.setItem('theme', themeClass);
  }, [darkMode]);

  const handleToggleChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`Themetoggle ${darkMode ? 'dark' : 'light'}`}>
      <div className="dark-mode-toggle">
        <label className="switch-container">
          <input
            type="checkbox"
            className="checkbox"
            id="darkModeCheckbox"
            checked={darkMode}
            onChange={handleToggleChange}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};


export default Themetoggle;
