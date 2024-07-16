const Movie = require('../models/Movie');

const getMovies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;
    const query = { deleted: false };
    if (filter) query.year = { $gte: filter.startYear, $lte: filter.endYear };

    const movies = await Movie.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const getMoviesById = async(req, res, next)=>{
  try{
    const {id} = req.query;
    const movie = await Movie.find(id);
    res.json(movie);
  }
  catch(error){
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { title, year, categories } = req.body;
    const poster = req.file ? req.file.path : null;
    const movie = new Movie({ title, year, categories, poster });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, year, categories } = req.body;
    const movie = await Movie.findByIdAndUpdate(id, { title, year, categories }, { new: true });
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const getAllDeletedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ deleted: true });
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { deleted: true }, { new: true });
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const restoreMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { deleted: false }, { new: true });
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const permanentDeleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted permanently', movie });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMovies, getMoviesById, createMovie, updateMovie, getAllDeletedMovies, deleteMovie, permanentDeleteMovie, restoreMovie };