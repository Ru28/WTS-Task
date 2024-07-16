import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState({ startYear: '', endYear: '' });

  useEffect(() => {
    fetchMovies();
  }, [page, sort, filter]);

  const fetchMovies = async () => {
    const response = await axios.get('http://localhost:5000/', {
      params: { page, sort, filter },
    });
    setMovies(response.data);
  };

  const handleSortChange = (selectedOption) => {
    setSort(selectedOption.value);
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Movie List</h1>
      <Link to="/create">Add Movie</Link>
      <div>
        <Select
          options={[
            { value: 'title', label: 'Title' },
            { value: 'year', label: 'Release Year' },
            { value: 'categories', label: 'Categories' },
          ]}
          onChange={handleSortChange}
        />
        <input
          type="number"
          name="startYear"
          value={filter.startYear}
          onChange={handleFilterChange}
          placeholder="Start Year"
        />
        <input
          type="number"
          name="endYear"
          value={filter.endYear}
          onChange={handleFilterChange}
          placeholder="End Year"
        />
      </div>
      <ul>
        {movies?.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <Link to={`/update/${movie._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default MovieList;
