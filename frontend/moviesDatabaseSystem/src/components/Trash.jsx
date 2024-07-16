// src/components/Trash.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Trash = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get('/api/movies/trash');
    setMovies(response.data);
  };

  const restoreMovie = async (id) => {
    await axios.post(`/api/movies/restore/${id}`);
    fetchMovies();
  };

  const permanentlyDeleteMovie = async (id) => {
    await axios.delete(`/api/movies/permanent/${id}`);
    fetchMovies();
  };

  return (
    <div>
      <h1>Trash</h1>
      <Link to="/">Back to Movie List</Link>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <button onClick={() => restoreMovie(movie._id)}>Restore</button>
            <button onClick={() => permanentlyDeleteMovie(movie._id)}>Delete Permanently</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trash;
