var express = require('express');
var router = express.Router();
const CRUD = require('../models/model_user');
const CRUD_Task = require('../models/model_task');

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
  const {page} = req.query;
  const options = {
  page: parseInt(page, 10) || 1,
  limit: 3
  }

  console.log('Welcome');
  console.log('======> Result: Finding...');
  CRUD_Task.paginate({}, options, function(err, result){
    if (err) throw err;
    console.log('======> Result: Below');
    console.log(result);
    res.render('home',{
      show_username: req.user.username,
      show_id: req.user.id,
      task: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      moment: require('moment')
    });
  })
});

router.get('/manage', isLoggedIn, (req, res) => {
  console.log('======> Result: Finding...');
  CRUD_Task.find({'account': req.user.username},(function(err, result){
    if (err) throw err;
    console.log('======> Result: Below');
    console.log(result);
    res.render('manage',{
      show_username: req.user.username,
      show_id: req.user.id,
      show_liked: req.user.liked,
      task: result,
      moment: require('moment')
    });
  }))
});

router.get('/account_setting', isLoggedIn, (req, res) => {
  res.render('account_setting',{
    show_username: req.user.username,
    show_id: req.user.id,
    show_name: req.user.name
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
