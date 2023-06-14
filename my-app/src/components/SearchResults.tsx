import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/SearchResults.css';

interface SearchResult {
  id: number;
  media_type: string;
  poster_path: string;
  name: string;
  known_for_department?: string;
  popularity: number;
  title: string;
  release_date?: string;
  overview: string;
  profile_path: string;
  known_for: { title: string }[];
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { results, totalResults } = location.state as {
    results: SearchResult[];
    totalResults: number;
  };

  const shortenText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  const renderSearchResult = (result: SearchResult) => {
    if (result.media_type === 'movie') {
      return (
        <li className="movie-card" key={result.id}>
          <Link to={`/movie/${result.id}`}>
            <div className="movie-image-container">
              {result.poster_path ? (
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={result.title}
                />
              ) : (
                <img className="movie-poster" src="/what2watch/placeholder.png" alt="Placeholder" />
              )}
              <div className="movie-overlay">
                <p className="movie-overlay-text">{shortenText(result.overview, 100)}</p>
              </div>
            </div>
            <h2 className="movie-title">{result.title}</h2>
          </Link>
        </li>
      );
    } else if (result.media_type === 'person') {
      return (
        <li className="actor-card" key={result.id}>
          <Link to={`/actor/${result.name}`}>
            <div className="actor-image-container">
              {result.profile_path ? (
                <img
                  className="actor-profile"
                  src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`}
                  alt={result.name}
                />
              ) : (
                <img className="actor-profile" src="/what2watch/placeholder.png" alt="Placeholder" />
              )}
              <div className="actor-overlay">
                <p className="actor-overlay-text">
                  Known for <br></br>
                  {result.known_for &&
                    result.known_for.map((movie, index) => (
                      <React.Fragment>
                        {movie.title}
                        {index < result.known_for.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </div>
            </div>
            <h2 className="actor-name">{result.name}</h2>
          </Link>
        </li>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="searchresults">
      <h1 className="searchresults-title">Search Result</h1>
      <p className="searchresults-total-results">Total results: {results.length}</p>
      {results.length > 0 ? (
        <ul className="searchresults-list">
          {results.map((result: SearchResult) => renderSearchResult(result))}
        </ul>
      ) : (
        <p className="searchresults-no-results">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
