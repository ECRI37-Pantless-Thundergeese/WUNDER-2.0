const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRouter = require('./routers/userRouter');
const NPSRouter = require('./routers/NPSRouter');
const { default: mongoose } = require('mongoose');
const userController = require('./controllers/UserController')
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const app = express();

const MONGO_URI =
  'mongodb+srv://kolashah:thundergoose@cluster0.h35s0uw.mongodb.net/?retryWrites=true&w=majority';

const db = process.env.NODE_ENV === 'test' ? 'Testing' : 'WunderThunderGoose';

mongoose.connect(MONGO_URI, {
  useNewURLParser: true,
  dbName: db,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// allows us to pass credentials from 8080 to 3000
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(express.static(path.resolve(__dirname, '../client')));

// Set up routers for '/NPS'
app.use('/NPS', NPSRouter);

// Set up routers for '/user'
app.use('/home/user', userRouter);

app.post('/signup/request', 
  userController.createUser,
  (req, res) => {
    return res.redirect('/')
})

app.post('/login', 
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession, 
  (req, res) => {
    return res.redirect('/home');
    // return res.status(200).json(res.locals.parks);
});

// Handle serving of static files
app.use('/build', express.static(path.join(__dirname, '../build')));

// app.get('/', (_req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.join(__dirname, '../client/public/index.html'));
// });

app.get('*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/client/public/index.html'));
});

app.use((_req, res) => res.sendStatus(404));

app.use((err, _req, res) => {
  const defaultErr = {
    log: 'Caught Unknown middleware error.',
    status: 500,
    message: { err: 'An unknown error occured.' },
  };
  const { log, status, message } = Object.assign(defaultErr, err);
  console.log('ERROR: ', log);
  return res.status(status).send(message);
});

console.log('listening on 3000...');
app.listen(3000);
