const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  description: { type: String },
  duration: { type: Number },
  data: { type: Date },
},
  { timestamps: true }
)

const Exercises = mongoose.model('Exercises', userSchema);

module.exports = Exercises;