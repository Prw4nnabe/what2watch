import React from 'react';
import { useLocation } from 'react-router-dom';
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
        <li className="searchresults-card" key={result.id}>
          <div className="searchresults-movie">
            <div className="searchresults-image-container">
              {result.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title} />
              )}
              <div className="searchresults-overlay">
                <p className="searchresults-overlay-text">{shortenText(result.overview, 100)}</p>
              </div>
            </div>
            <h2 className="searchresults-title">{result.title}</h2>
          </div>
        </li>
      );
    } else if (result.media_type === 'person') {
      return (
        <li className="searchresults-card" key={result.id}>
          <div className="searchresults-actor">
            <div className="searchresults-image-container">
              {result.profile_path && (
                <img src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`} alt={result.name} />
              )}
              <div className="searchresults-overlay">
                <p className="searchresults-overlay-text">
                  Known for <br></br>
                  {result.known_for && result.known_for.map((movie, index) => (
                    <React.Fragment>
                      {movie.title}
                      {index < result.known_for.length - 1 && <br />}
                    </React.Fragment>
                    ))
                  }
                </p>
              </div>
            </div>
            <h2 className="searchresults-title">{result.name}</h2>
          </div>
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
