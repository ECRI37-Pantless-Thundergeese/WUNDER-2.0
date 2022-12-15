const session = require('../models/sessionModel');
const User = require('../models/userModel');

const sessionController = {};

// find the appropriate session for this request in the database,
// the nverify whether or not the session is still valid.
sessionController.isLoggedIn = (req, res, next) => {
  console.log('works')
};

//startSession - create and save a new Session into the database
sessionController.startSession = (req, res, next) => {
  // we have cookie with SSID 
session.create({ cookieId: res.locals.userID })
    .then((data) => {
      console.log('cookiedata :', data);
      console.log('This session has been started')
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Caught error in startSession middleware',
        status: 400,
        message: { err: 'An unknown error occured.' },
      });
    })
};

module.exports = sessionController;
