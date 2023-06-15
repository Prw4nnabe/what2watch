import React, { useState, useEffect } from 'react';
import { getAccessToken } from './ApiAccess';
import { useParams } from 'react-router-dom';
import '../css/ActorDetails.css';

interface Actor {
  adult:boolean;
  also_known_as: string[];
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  deathday: string;
  gender: 1;
  place_of_birth: string;
}

function ActorDetails() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<Actor | null>(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
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
          `https://api.themoviedb.org/3/person/${id}?language=en-US`,
          options
        );
        const data: Actor = await response.json();

        setActor(data);
      } catch (error) {
        console.log('Wystąpił błąd podczas pobierania szczegółów aktora:', error);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (!actor) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="actor-details-bg">
      <div className="actor-details-content">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${actor.profile_path}`}
          alt={actor.name}
          className="poster-details"
        />
        <div>
          <h1>{actor.name}</h1>
          <p><strong className="label">Adult: </strong>{actor.adult}</p>
          <p><strong>Aliases: </strong> {actor.also_known_as.join(', ')}</p>
          <p><strong className="label">Gender: </strong>{actor.gender}</p>
          <p><strong className="label">Birthday: </strong>{actor.birthday}</p>
          <p><strong className="label">Place of birth: </strong>{actor.place_of_birth}</p>
          <p><strong className="label">Deathday:</strong>{actor.deathday}</p>
          <p><strong className="label">Bio: </strong>{actor.biography}</p>
        </div>
      </div>
    </div>
  );
}

export default ActorDetails;
