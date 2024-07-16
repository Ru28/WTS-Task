const express = require('express');
const multer = require('multer');
const { getMovies, createMovie, updateMovie, deleteMovie, restoreMovie } = require('../controllers/movies');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', getMovies);
router.post('/', upload.single('poster'), createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.post('/restore/:id', restoreMovie);

module.exports = router;