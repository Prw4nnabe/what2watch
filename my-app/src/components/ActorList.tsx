import React, { useState, useEffect } from 'react';
import { getAccessToken } from './ApiAccess';
import { Link } from 'react-router-dom';
import '../css/ActorList.css';

interface Actor {
  id: number;
  name: string;
  profile_path: string;
  known_for: Movie[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function ActorList() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const data = await response.json();
        setActors((prevActors) => {
          const uniqueActors = data.results.filter(
            (newActor: Actor) => !prevActors.find((actor: Actor) => actor.id === newActor.id)
          );
          return [...prevActors, ...uniqueActors];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log('Wystąpił błąd podczas pobierania aktorów:', error);
      }
    };

    fetchActors();
  }, [currentPage]);

  const loadMoreActors = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="actor-list-container">
      <h1 className="actor-list-title">Actor List</h1>
      <ul className="actor-list">
        {actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </ul>
      {currentPage < totalPages && (
        <button className="load-more-button" onClick={loadMoreActors}>
          Load More
        </button>
      )}
    </div>
  );
}

interface ActorCardProps {
  actor: Actor;
}

function ActorCard({ actor }: ActorCardProps) {
  const shortenText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <li className="actor-card">
      <Link to={`/actor/${actor.id}`}>
        <div className="actor-image-container">
          <img
            className="actor-profile"
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}
          />
        </div>
        <h2 className="actor-name">{actor.name}</h2>
      </Link>
    </li>
  );
}

export default ActorList;
