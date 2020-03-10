const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

//import model_user for insert/login
const User = require('../models/model_user');

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  // simple validation
  if (!name || !username || !password) {
    return res.render('index', { message: 'Please try again' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    username,
    password: passwordHash
  });
  console.log('Name: '+name+'\nUsername: '+username+'\nPassword: '+passwordHash);
  await user.save();
  res.render('index', { user });
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // simple validation
  if (!username || !password) {
    return res.render('register', { message: 'Please try again' });
  }

  const user = await User.findOne({
    username
  });

  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (isCorrect) {
      return res.render('index', { message: 'Welcome' });
    } else {
      return res.render('index', { message: 'Username or Password incorrect' });
    }
  } else {
    return res.render('index', { message: 'Username does not exist.' });
  }
});

module.exports = router;