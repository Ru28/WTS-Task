// src/components/UpdateMovie.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';

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

const UpdateMovie = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [categories, setCategories] = useState([]);
  const [poster, setPoster] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    const response = await axios.get(`http://localhost:5000/api/movies/getmovie/${id}`);
    const movie = response.data;
    setTitle(movie.title);
    setYear(movie.year);
    setCategories(movie?.categories?.map(c => ({ value: c, label: c })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveToUndoStack();
    let context = {
      'title': title,
      'year': year,
      'categories': categories.map(c => c.value)
    }
    if (poster) context = [...context,'poster', poster];
    await axios.put(`http://localhost:5000/api/movies/updatemovie/${id}`, context);
    navigate('/');
  };

  const saveToUndoStack = () => {
    setUndoStack([...undoStack, { title, year, categories, poster }]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop();
      setRedoStack([...redoStack, { title, year, categories, poster }]);
      setTitle(lastState.title);
      setYear(lastState.year);
      setCategories(lastState.categories);
      setPoster(lastState.poster);
      setUndoStack([...undoStack]);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const lastState = redoStack.pop();
      saveToUndoStack();
      setTitle(lastState.title);
      setYear(lastState.year);
      setCategories(lastState.categories);
      setPoster(lastState.poster);
      setRedoStack([...redoStack]);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='m-4 border border-black w-1/2'>
        <h1 className='m-6 p-4 text-3xl font-bold flex justify-center'>Update Movie</h1>
        <form className='my-6' onSubmit={handleSubmit}>
          <input className='px-5 py-2 m-5 border border-black'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input className='px-5 py-2 m-5 border border-black'
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            required
          />
          <Select className='m-5 py-2'
            isMulti
            options={categoryOptions}
            value={categories}
            onChange={setCategories}
            placeholder="Categories"
          />
          <input className='mx-5' type="file" onChange={(e) => setPoster(e.target.files[0])} />
          <button className='border border-black bg-gray-300 px-4 py-2 m-2' type="submit">Update</button>
          <button className='border border-black bg-gray-300 px-4 py-2 m-2' type="button" onClick={undo}>Undo</button>
          <button className='border border-black bg-gray-300 px-4 py-2 m-2' type="button" onClick={redo}>Redo</button>
        </form>
        </div>
    </div>
  );
};

export default UpdateMovie;
