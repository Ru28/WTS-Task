// src/components/UpdateMovie.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';

const categoryOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
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
    const response = await axios.get(`/api/updatemovie/${id}`);
    const movie = response.data;
    setTitle(movie.title);
    setYear(movie.year);
    setCategories(movie.categories.map(c => ({ value: c, label: c })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveToUndoStack();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('categories', categories.map(c => c.value));
    if (poster) formData.append('poster', poster);

    await axios.put(`/api/updatemovie/${id}`, formData);
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
    <div>
      <h1>Update Movie</h1>
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
        <input type="file" onChange={(e) => setPoster(e.target.files[0])} />
        <button type="submit">Update</button>
        <button type="button" onClick={undo}>Undo</button>
        <button type="button" onClick={redo}>Redo</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
