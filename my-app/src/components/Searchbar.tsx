import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from './ApiAccess';
import { IoMdSearch } from 'react-icons/io';

const SearchBar: React.FC <{ onClose: () => void }> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          searchQuery
        )}&include_adult=true&language=en-US&page=1`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      navigate(`/search-results`, { state: { results: data.results } });
      onClose();
    } catch (error) {
      console.error('Wystąpił błąd podczas wyszukiwania:', error);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search movies and actors"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button" onClick={onClose}>
          <IoMdSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
