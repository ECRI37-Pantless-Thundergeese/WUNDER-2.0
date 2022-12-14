const express = require('express');
const userController = require('../controllers/UserController');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');

const userRouter = express.Router();

userRouter.get(
  '/:parkCode',
  userController.getUser,
  userController.getParkInfo,
  (_req, res) => {
    return res.status(200).json(res.locals.parkInfo);
  }
);

userRouter.get('/', 
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  userController.getParks, 
  (req, res) => {
    return res.status(200).json(res.locals.parks);
});

userRouter.post('/:parkCode', userController.addPark, (_req, res) => {
  return res.status(200).json(res.locals.park);
});

userRouter.post('/', userController.createUser, (_req, res) => {
  return res.status(200).json(res.locals.newUser);
});


module.exports = userRouter;
