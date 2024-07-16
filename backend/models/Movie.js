const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  categories: { type: [String], required: true },
  poster: { type: String },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);