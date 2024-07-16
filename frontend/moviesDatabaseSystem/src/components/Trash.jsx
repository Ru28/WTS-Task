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
        <div className='text-lg m-4 p-2 bg-orange-100 border border-orange-300 rounded-lg'>
            {movies.length!==0 ? "deleted movies": "No deleted movies"}
        </div>
        <ul>
          {movies?.map((movie) => (
            <li key={movie._id}>
              <div className='p-2 m-4 border border-black rounded-lg bg-green-100'>
              <h2 className='text-xl font-bold'>{movie.title}</h2>
              <p className='text-lg'>{movie.categories}</p>
              <p className='text-lg'>{movie.year}</p>
              <div className='flex justify-between'>
                <button className='p-2 m-2 border border-black rounded-lg bg-purple-200' onClick={() => restoreMovie(movie._id)}>Restore</button>
                <button className='p-2 m-2 border border-black rounded-lg bg-purple-200' onClick={() => permanentlyDeleteMovie(movie._id)}>Delete Permanently</button>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trash;
