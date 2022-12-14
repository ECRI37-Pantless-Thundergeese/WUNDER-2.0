const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: { type: String, required: true },
    parksVisited: {},
  },
  { minimize: false }
);

// userSchema.pre('save', function(next) {
//   const user = this;
//   bcrypt.hash(user.password, SALT_WORK_FACTOR)
//     .then((hash) => {
//       user.password = hash;
//       return next();
//     })
//     .catch(err) => next()
// })

module.exports = mongoose.model('user', userSchema);
