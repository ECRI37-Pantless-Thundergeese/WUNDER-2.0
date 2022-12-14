const User = require('../models/userModel');
const cookieController = {};

// ===================================================
// Set SSID Cookie
// ===================================================

// need to be chained to login routes after verifyUser MW
cookieController.setSSIDCookie = (req, res, next) => {
  const userID = `${res.locals.user._id}`;
  res.cookie(userID);
  return next();
};

module.export = cookieController;
