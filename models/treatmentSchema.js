const mongoose = require('mongoose');
const treatmentSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  body: String,
  img: String,
  ved: String,
  DesktopImg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'image',
  },
});
module.exports = mongoose.model('treatment', treatmentSchema);
