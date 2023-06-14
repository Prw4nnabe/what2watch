import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken } from './ApiAccess';
import { useParams } from 'react-router-dom';
/*import Swiper from 'swiper';*/
/*import 'swiper/swiper.min.css';*/
import '../css/MovieDetails.css';

interface Movie {
  title: string;
  poster_path: string;
  budget: number;
  genres: { name: string }[];
  release_date: string;
  runtime: number;
  status: string;
  overview: string;
  cast: {
    name: string;
    character: string;
    profile_path: string;
  }[];
}

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const castSliderRef = useRef<HTMLDivElement>(null);

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
        

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        const castData = await castResponse.json();

        setMovie(prevMovie => ({
          ...prevMovie,
          ...data,
          cast: castData.cast
        }));

        /*
        if (castSliderRef.current) {
          new Swiper(castSliderRef.current, {
            slidesPerView: 5,
            spaceBetween: 15,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            direction: 'horizontal'
          });
        }*/
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
      <div className='devtime'>
      <h2>Obsada</h2>
      <div ref={castSliderRef} className="swiper-container">
        <div className="swiper-wrapper">
          {movie.cast.map(actor => (
            <div key={actor.name} className="swiper-slide">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="single-profile"
              />
              <div className="actor-details">
                <p className="actor-name">{actor.name}</p>
                <p className="actor-character">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      </div>
    </div>
  );
}

export default MovieDetails;
