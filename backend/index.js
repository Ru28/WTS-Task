const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});