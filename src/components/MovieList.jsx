import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_KEY = '90fbcb0e'; // Replace with your OMDb API key
const BASE_URL = 'http://www.omdbapi.com/';

function MovieList() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query,
        },
      })
      .then(response => setMovies(response.data.Search || []))
      .catch(error => console.error('Error fetching movie data:', error));
    }
  }, [query]);

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
            </Link>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
