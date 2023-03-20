const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  stars: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'review body is requried'],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuthUser',
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('review', reviewSchema);
