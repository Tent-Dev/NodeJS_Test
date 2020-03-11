const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
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

/* Session check */
// router.get('/login', isLoggedIn, function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/login', async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;

//   // simple validation
//   if (!username || !password) {
//     return res.render('register', { message: 'Please try again' });
//   }

//   const user = await User.findOne({
//     username
//   });

//   if (user) {
//     const isCorrect = bcrypt.compareSync(password, user.password);

//     if (isCorrect) {
//     	//Save session
//     	req.user = user;
//       	return res.render('home', { message: username });
//     } else {
//       	return res.render('index', { message: 'Username or Password incorrect' });
//     }
//   } else {
//    		return res.render('index', { message: 'Username does not exist.' });
//   }
// });

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/', // กำหนด ถ้า login fail จะ redirect ไป /login
    successRedirect: '/home' // ถ้า success จะไป /
  }),
  async (req, res) => {
    const { username, password } = req.body;
    return res.redirect('/');
  }
);

module.exports = router;