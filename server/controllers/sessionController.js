const Session = require('../models/sessionModel');
const User = require('../models/userModel');

const sessionController = {};

// find the appropriate session for this request in the database,
// the nverify whether or not the session is still valid.
sessionController.isLoggedIn = (req, res, next) => {};

//startSession - create and save a new Session into the database
// sessionController.startSession = (req, res, next) => {
//   Session.create({ cookieId: res.locals./*userArr[0]._id*/ }, (err, cb) => {
//     if (err)
//       next({
//         log: 'ERROR in isLoggedIn in sessionController',
//         err: 'an error occurred',
//       });
//     return next();
//   });
// };

module.exports = sessionController;
