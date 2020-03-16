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

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/', // กำหนด ถ้า login fail จะ redirect ไป /login
    successRedirect: '/home', // ถ้า success จะไป /
    failureFlash : 'Username or Password is valid'
  }),(req, res) =>{
    console.log('TEST');
  }
  // async (req, res) => {
  //   const { username, password } = req.body;
  //   return res.redirect('/');
  // }
);

router.get('/', function(req,res){
  console.log('TEST');
  console.log(req.flash('message'));
  res.send();
});

module.exports = router;
