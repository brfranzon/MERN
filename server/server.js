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
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.once('open', () => console.log('Mongo DB connection established!'))
// ******************************************************

//******************* Routes ****************************/
app.get('/users', (req, res) => {
  User.find().then(users => res.json(users)).catch(err => res.status(400).json('Err: ' + err));
})

app.post('/users/add', (req, res) => {

  const req_username = req.body.username;
  const newUser = new User({ username: req_username });

  newUser.save().then(() => res.json('User added!')).catch(err => res.status(400).json('Error: ' + err));
})
/**************************************************** */

app.listen(port, () => console.log(`Server running on port ${port}`));