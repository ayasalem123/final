var jwt = require('jsonwebtoken');
var user = require('../models/user.js');
const dotenv = require('dotenv');
exports.AuthMiddleware = async (req, res, next) => {
  let token;
  if (!req?.headers?.authorization) {
    res.json({ message: 'There is no token attached to the header' });
  }

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1].toString();

    if (token) {
      var decoded = jwt.verify(token, process.env.SECRET);

      const searcheduser = await user
        .findById({ _id: decoded?.id })
        .select('-password');
      req.user = searcheduser;
      next();
    }
  }
};
