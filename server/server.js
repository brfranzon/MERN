const express = require('express');
const cors = require('cors');

require('dotenv').config();

const jwt = require('jsonwebtoken');

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
db.once('open', () => console.log('Mongo DB connection established...!'))
// ******************************************************



//******************* Routes ****************************/
// protected route
app.get('/login', (req, res) => {
  res.json({
    test: "my protected route"
  })
})


// get users - protected
app.get('/users', (req, res) => {

  console.log('users...')
  User.find().then(users => res.json(users)).catch(err => res.status(400).json('Err: ' + err));
});


// get by id
app.get('/users/:id', ensureToken, (req, res) => {

  // 2. check -> verify the user token
  jwt.verify(req.token, 'my_top_secret', (err, data) => {
    if (err) {
      res.json({ error: 'False token' })
    } else {
      //res.json({ text: 'token valid' });
      User.findById(req.params.id).then(user => res.json(user)).catch(err => res.status(400).json('Err: ' + err));
    }
  })

});

// 1. check -> if there is a token
function ensureToken(req, res, next) {
  console.log('header', req)
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    //res.sendStatus(403);
    res.json({error: 'you should enter a token: forbidden!'})
  }
}


// create new user 
app.post('/users/add', (req, res) => {

  // O. step -> create a token
  const my_token = jwt.sign({ username: req.body.username, password: req.body.password }, 'my_top_secret');
  console.log(my_token);

  const req_username = req.body.username;
  const req_psw = req.body.password;
  const newUser = new User({ username: req_username, password: req_psw, token: my_token });

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