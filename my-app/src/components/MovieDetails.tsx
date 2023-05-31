import React, { useState, useEffect } from 'react';
import { getAccessToken } from './ApiAccess';
import { useParams } from 'react-router-dom';

interface Movie {
  title: string;
  poster_path: string;
  budget: number;
  genres: { name: string }[];
  release_date: string;
  runtime: number;
  status: string;
  overview: string;
}

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = getAccessToken();
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data: Movie = await response.json();
        setMovie(data);
      } catch (error) {
        console.log('Wystąpił błąd podczas pobierania szczegółów filmu:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />
      <p><strong className="label">Budżet:</strong> {movie.budget}</p>
      <p><strong className="label">Gatunki:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p><strong className="label">Data premiery:</strong> {movie.release_date}</p>
      <p><strong className="label">Czas trwania:</strong> {movie.runtime} minut</p>
      <p><strong className="label">Status:</strong> {movie.status}</p>
      <p className="overview">{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
