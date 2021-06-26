const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String },
  token: { type: String }
},
  { timestamps: true }
)

const UsersAuthJwt = mongoose.model('users_auth_jwt', userSchema);

module.exports = UsersAuthJwt;