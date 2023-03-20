const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuthUser',
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('profile', profileSchema);
