const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    Role: {
      type: String,
      dr: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
UserSchema.virtual('reviews', {
  ref: 'review',
  foreignField: 'user',
  localField: '_id',
});

module.exports = mongoose.model('AuthUser', UserSchema);
