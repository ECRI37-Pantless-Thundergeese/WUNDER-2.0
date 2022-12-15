const express = require('express');
const userController = require('../controllers/UserController');

const userRouter = express.Router();

// userRouter.get(
// userRouter.get(
//   '/:parkCode',
//   userController.getUser,
//   userController.getParkInfo,
//   (_req, res) => {
//     return res.status(200).json(res.locals.parkInfo);
//   }
// );

userRouter.get('/', userController.getUser, (_req, res) => {
  return res.status(200).json(res.locals.userData);
});

userRouter.put('/', userController.addPark, (_req, res) => {
  return res.status(200).json(res.locals.park);
});

userRouter.post('/', userController.createUser, (_req, res) => {
  return res.status(200).json(res.locals.newUser);
});


module.exports = userRouter;
