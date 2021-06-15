const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// *************** Connect to DATABASE ******************
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Exercises = require('./models/exercise.model');
const { exists } = require('./models/user.model');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.once('open', () => console.log('Mongo DB connection established!'))
// ******************************************************



//******************* Routes ****************************/

// get users
app.get('/users', (req, res) => {
  User.find().then(users => res.json(users)).catch(err => res.status(400).json('Err: ' + err));
});

// get by id
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id).then(user => res.json(user)).catch(err => res.status(400).json('Err: ' + err));
});

// create new user
app.post('/users/add', (req, res) => {
  const req_username = req.body.username;
  const req_psw = req.body.password;
  const newUser = new User({ username: req_username, password: req_psw });
  newUser.save().then(() => res.json('User added!')).catch(err => res.status(400).json('Error: ' + err));
});

// update already exiting user
app.post('/users/update/:id', (req, res) => {
  const req_username = req.body.username;
  const req_psw = req.body.password;
  User.findById(req.params.id)
    .then(user => {
      user.username = req_username;
      user.password = req_psw;
      user.save().
        then(() => res.json('User updated!')).
        catch(err => res.status(400).json('Error: ' + err))
    })
})

// delete a user by id
app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id).then(() => res.json('User deleted!')).catch(err => res.status(400).json('Error: ' + err));
});



// Exercises
app.get('/exercises', (req, res) => {
  Exercises.find().then(exercise => res.json(exercise)).catch(err => res.status(400).json('Err: ' + err));
});

// get exercise by id
app.get('/exercises/:id', (req, res) => {
  Exercises.findById(req.params.id).then(exercise => res.json(exercise)).catch(err => res.status(400).json('Err: ' + err));
});

// create new exercise
app.post('/exercises/add', (req, res) => {
  const req_username = req.body.username;
  const req_description = req.body.description
  const req_duration = Number(req.body.duration);
  const req_data = Date.parse(req.body.data);

  const newExercise = new Exercises({
    username: req_username,
    description: req_description,
    duration: req_duration,
    data: req_data
  });
  newExercise.save().then(() => res.json('new Exercise added!')).catch(err => res.status(400).json('Error: ' + err));
});


// update already exiting exercise
app.post('/exercises/update/:id', (req, res) => {

  Exercises.findById(req.params.id).
    then(exercise => {
      exercise.username = req.body.username,
        exercise.description = req.body.description,
        exercise.duration = req.body.duration,
        exercise.data = req.body.exercise;

      // exercise.save(()=> res.json(' Exercise updated'))
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`));