// src/components/CreateMovie.js
import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
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

    await axios.post('http://localhost:5000/api/createmovie', formData);
    navigate('/');
  };

  return (
    <div>
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          required
        />
        <Select
          isMulti
          options={categoryOptions}
          value={categories}
          onChange={setCategories}
          placeholder="Categories"
        />
        <input type="file" onChange={(e) => setPoster(e.target.files[0])} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateMovie;
