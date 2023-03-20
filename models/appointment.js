const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  paid: Boolean,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});
module.exports = mongoose.model('appointment', appointmentSchema);
