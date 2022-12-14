const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs')

const userController = {};

// Create a new user in the database
userController.createUser = async (req, res, next) => {
  console.log('in');
  try {
    const user = await User.create({
      name: req.body.name,
      parksVisited: {},
    });
    res.locals.newUser = user; // <-- send back all user info
    return next();
  } catch (err) {
    return next(err);
  }
};

// Get user info
userController.getUser = (req, res, next) => {
  // User.findOne({ name: req.body.name})
  User.findOne({ name: 'Aalok' })
    .then((user) => {
      if (user) {
        res.locals.user = user; // <-- send back all user info
        return next();
      }
    })
    .catch((err) => {
      console.log('User not found');
      return next({ message: 'Error in getUser' });
    });
};

// Add a park to a user's completed parks
userController.addPark = async (req, res, next) => {
  try {
    const parkCode = req.params.parkCode;
    const newPark = {
      date: req.body.date,
      notes: req.body.notes,
      activitiesCompleted: req.body.activitiesDone,
    };
    // const user = await User.findOne({ name: req.body.name})
    const user = await User.findOne({ name: 'Aalok' });
    if (user) {
      const parksVisited = { ...user.parksVisited, [parkCode]: newPark };
      user.parksVisited = parksVisited;
      const newUser = await user.save();
      console.log(newUser);
    }
    res.locals.park = user.parksVisited[parkCode]; // <-- send back the newly added park's info
    return next();
  } catch (err) {
    return next(err);
  }
};

// Get parks completed array for icon coloring on landing page
userController.getParks = (req, res, next) => {
  const {userID} = res.locals
  
  User.findOne({_id: userID})
    .then((userData) => {
      res.locals.parks = Object.keys(userData.parksVisited); // <-- send back array of parks completed
      return next();
    })
    .catch((err) => {
      return next({ message: 'Error in getParks' });
    });
};

// Get user's park-specific info for top of modal display
userController.getParkInfo = (req, res, next) => {
  try {
    // console.log(req.params);
    const { parkCode } = req.params;
    const { parksVisited } = res.locals.user;
    // console.log(parkCode);
    console.log(parksVisited);
    res.locals.parkInfo = parksVisited[parkCode];
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.verifyUser = (req, res, next) => {
  const { password, username } = req.body; 

  User.findOne({ username: `${username}`})
    .then((doc) => {
      // if username doesn't exist, send them to sign up
      if (!doc) {
        const signup = confirm('username not found, would you like to sign up?')
        if (signup) {
          return res.redirect('/signup')
        } else {
          return res.redirect('/')
        }
      }
      // check password
      bcrypt
        .compare(password, doc.password)
        .then((result) => {
          if (!result) {
            console.log('incorrect username or password')
            return res.redirect('/')
          } else {
            res.locals.userID = doc._id;
            console.log('should log ID :', doc._id)
            return next();
          }
        })
        .catch((err) => {
          return next({
          log: 'Caught error while verifying password in verifyUser middleware',
          status: 400,
          message: { err: 'An unknown error occured.' },
        })
      })
    .catch((err) => {
      return next({
        log: 'Caught error while verifying username in verifyUser middleware',
        status: 400,
        message: { err: 'An unknown error occured.' },
      });
    })
  });
};


module.exports = userController;
