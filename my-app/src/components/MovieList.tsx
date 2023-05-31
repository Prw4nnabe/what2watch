import React, { useState, useEffect } from 'react';
import { getAccessToken } from './ApiAccess';
import { Link } from 'react-router-dom';
import '../css/MovieList.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const data = await response.json();
        setMovies((prevMovies) => {
          const uniqueMovies = data.results.filter(
            (newMovie: Movie) => !prevMovies.find((movie: Movie) => movie.id === newMovie.id)
          );
          return [...prevMovies, ...uniqueMovies];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log('Wystąpił błąd podczas pobierania filmów:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const loadMoreMovies = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Lista filmów</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {currentPage < totalPages && (
        <button className="load-more-button" onClick={loadMoreMovies}>
          Załaduj więcej
        </button>
      )}
    </div>
  );
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const shortenText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <li className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-image-container">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <p className="movie-overlay-text">{shortenText(movie.overview, 100)}</p>
          </div>
        </div>
        <h2 className="movie-title">{movie.title}</h2>
      </Link>
    </li>
  );
}

export default MovieList;
