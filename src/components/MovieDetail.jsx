import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_KEY = '90fbcb0e'; 
const BASE_URL = 'http://www.omdbapi.com/';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    })
    .then(response => setMovie(response.data))
    .catch(error => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h1>{movie.Title}</h1>
      <img
        src={movie.Poster}
        alt={movie.Title}
      />
      <p>{movie.Plot}</p>
      <h3>Release Date:</h3>
      <p>{movie.Released}</p>
      <h3>Genres:</h3>
      <p>{movie.Genre}</p>
      <h3>Director:</h3>
      <p>{movie.Director}</p>
      <h3>Cast:</h3>
      <p>{movie.Actors}</p>
      <h3>IMDB Rating:</h3>
      <p>{movie.imdbRating}</p>
    </div>
  );
}

export default MovieDetail;
