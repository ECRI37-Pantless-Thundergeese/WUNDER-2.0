const User = require('../models/userModel');
const cookieController = {};

// need to be chained to login routes after verifyUser MW
cookieController.setSSIDCookie = (req, res, next) => {
  const userID = `${res.locals.userID}`;
  res.cookie(userID);
  return next();
};

module.exports = cookieController;
