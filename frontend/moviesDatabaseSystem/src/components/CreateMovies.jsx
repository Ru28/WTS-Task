// src/components/CreateMovie.js
import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Science Fiction', label: 'Science Fiction' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Musical', label: 'Musical' },
  { value: 'Biography', label: 'Biography' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Western', label: 'Western' },
  { value: 'Family', label: 'Family' },
  { value: 'War', label: 'War' },
  { value: 'Historical', label: 'Historical' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Fantasy-Adventure', label: 'Fantasy-Adventure' }
];

const CreateMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [categories, setCategories] = useState([]);
  const [poster, setPoster] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('categories', categories.map(c => c.value));
    formData.append('poster', poster);

    await axios.post('http://localhost:5000/api/movies/createmovie', formData);
    navigate('/');
  };

  return (
    <div className='flex justify-center'>
    <div>
      <h1 className='flex justify-center text-3xl font-bold p-6 m-6'>Create Movie</h1>
      <form className='my-4' onSubmit={handleSubmit}>
        <input className='m-4 p-4 border border-black'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input className='my-4 p-4 border border-black'
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          required
        />
        <Select className='m-4 p-2 border border-blue-500'
          isMulti
          options={categoryOptions}
          value={categories}
          onChange={setCategories}
          placeholder="Categories"
        />
        <input className='m-2 p-2' type="file" onChange={(e) => setPoster(e.target.files[0])} required />
        <button className='px-4 py-2 border border-black bg-gray-400' type="submit">Create</button>
      </form>
    </div>
    </div>
  );
};

export default CreateMovie;
