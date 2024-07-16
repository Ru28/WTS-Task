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
    const response = await axios.get('http://localhost:5000/api/movies/getalldeletedmovie');
    setMovies(response.data);
  };

  const restoreMovie = async (id) => {
    await axios.post(`http://localhost:5000/api/movies/restore/${id}`);
    fetchMovies();
  };

  const permanentlyDeleteMovie = async (id) => {
    await axios.delete(`http://localhost:5000/api/movies/permanentdelete/${id}`);
    fetchMovies();
  };

  return (
    <div className='flex justify-center'>
      <div>
        <h1 className='m-6 p-2 text-4xl font-bold'>Trash</h1>
        <div className='my-2 p-2 text-xl text-blue-500 border border-black cursor-pointer bg-yellow-100'><Link to="/">Back to Movie List</Link></div>
        <ul>
          {movies?.map((movie) => (
            <li key={movie._id}>
              <h2>{movie.title}</h2>
              <p>{movie.categories}</p>
              <p>{movie.year}</p>
              <button onClick={() => restoreMovie(movie._id)}>Restore</button>
              <button onClick={() => permanentlyDeleteMovie(movie._id)}>Delete Permanently</button>
            </li>
          ))}
          <div className='text-lg m-4 p-2'>
            {movies.length===0 ? "No deleted movies": null}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Trash;
