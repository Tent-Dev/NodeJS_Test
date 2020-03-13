var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
	console.log('======> Check session: '+req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET page. */
router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/home', isLoggedIn, (req, res) => {
	console.log('Welcome');
	res.render('home',{show_message: req.user.username, show_id: req.user.id});
});

router.get('/manage', isLoggedIn, (req, res) => {
	res.render('manage',{show_message: req.user.username, show_id: req.user.id});
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
