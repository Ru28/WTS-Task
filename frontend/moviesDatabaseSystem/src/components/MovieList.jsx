import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [deletedMovies,setDeletedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState({ startYear: null, endYear: null });

  useEffect(() => {
    fetchMovies();
  }, [page, sort, filter,deletedMovies]);

  const fetchMovies = async () => {
    const response = await axios.get('http://localhost:5000/api/movies/getmovies', {
      params: { page, sort, filter},
    });
    setMovies(response.data);
  };

  const handleSortChange = (selectedOption) => {
    setSort(selectedOption.value);
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  
  const handleDeleteMovie = async (movieId)=>{
    const response = await axios.delete(`http://localhost:5000/api/movies/delete/${movieId}`);
    setDeletedMovies(response.data);
  }

  return (
    <div className='flex justify-center'>
      <div className='my-5 w-3/4'>
      <h1 className='p-4 m-4 text-4xl font-bold flex justify-center'>Movie List</h1>
      <div className='my-5 flex justify-between'>
        <div className='text-lg border border-black py-2 px-4 rounded-lg'>
          <Link to="/create">Add Movie</Link>
        </div>
        <div className='text-lg border border-black py-2 px-4 rounded-lg'>
          <Link to="/delete">Deleted Movie</Link>
        </div>
      </div>
      <div className='my-4'>
        <Select className='border border-blue-500 my-4'
          options={[
            { value: 'title', label: 'Title' },
            { value: 'year', label: 'Release Year' },
            { value: 'categories', label: 'Categories' },
          ]}
          onChange={handleSortChange}
        />
        <input className='border border-black rounded-lg p-2 mr-2 my-2'
          type="number"
          name="startYear"
          value={filter.startYear}
          onChange={handleFilterChange}
          placeholder="Start Year"
        />
        <input className='border border-black rounded-lg p-2 ml-2 my-2'
          type="number"
          name="endYear"
          value={filter.endYear}
          onChange={handleFilterChange}
          placeholder="End Year"
        />
      </div>
      <ul className='flex flex-wrap'>
        {movies?.map((movie) => (
          <li className='flex justify-around border border-black w-full rounded-lg my-2' key={movie._id}>
            <h2 className='text-xl font-bold m-2 p-2'>Title: {movie.title}</h2>
            <p className='text-lg m-2 p-2'>Release Year: {movie.year}</p>
            <p className='text-lg m-2 p-2'>Category: {movie.categories}</p>
            <div className='flex justify-between'>
              <div className='p-2 m-2 border border-blue-500 rounded-lg'><Link to={`/update/${movie._id}`}>Edit</Link></div>
              <button className='p-2 m-2 border border-blue-500 rounded-lg' onClick={()=>handleDeleteMovie(movie._id)}>delete</button>
            </div>
          </li>
        ))}
      </ul>
        <div className='m-10 flex justify-between'>
            <button className='text-lg py-2 px-4 border border-black rounded-lg' disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <button className='text-lg py-2 px-8 border border-black rounded-lg' onClick={() => setPage(page + 1)}>
              Next
            </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
