var express = require('express');
var router = express.Router();
const CRUD = require('../models/model_user');

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
  CRUD.find({'_id': req.user.id},function(err, data){
    var result_data = []
		if(err){
			console.log('======> Query status: Cannot query');
		}else{
      data.forEach(function(value, key){
        if(value){
          //console.log('======> Result: '+value.task);
          //result_data.push(value.task)
          console.log('======> Result: Below');
          value.task.forEach(function(val, k){
            console.log(val)
            result_data.push(val)
          })
        }else{
          console.log('======> Result: No data');
        }
      })
      res.render('manage',{
        show_message: req.user.username,
        show_id: req.user.id,
        task: result_data
      });
		}
	})
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
