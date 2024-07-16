const express = require('express');
const multer = require('multer');
const { getMovies, createMovie, updateMovie, deleteMovie, restoreMovie, getMoviesById, getAllDeletedMovies, permanentDeleteMovie } = require('../controllers/movies');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/getmovies', getMovies);
router.get('/getmovie/:id',getMoviesById);
router.post('/createmovie', upload.single('poster'), createMovie);
router.put('/updatemovie/:id', updateMovie);
router.get('/getalldeletedmovie',getAllDeletedMovies);
router.delete('/delete/:id', deleteMovie);
router.delete('/permanentdelete/:id',permanentDeleteMovie);
router.post('/restore/:id', restoreMovie);

module.exports = router;