const { body } = require('express-validator');
exports.DataValidation = [
  body('email', 'Please put a valid email').isEmail(),
  body('password', 'Password shoud be at least 5').isLength({ min: 5 }),
];
