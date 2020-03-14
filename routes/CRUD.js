const express = require('express');
const router = express.Router();
const CRUD = require('../models/model_user');

router.post('/add', async (req, res) => {
	var id = req.user.id;
	console.log('======> Username ref: '+req.user.username)
	var { desc_add } = req.body;
	var username = req.user.username;
  
	// simple validation
	if (!desc_add) {
		console.log('======> Don\'t have description to add.')
		res.redirect('/manage');
	  	// return res.render('manage', { message: 'Please try again' });
	}
	console.log('======>Get data : '+desc_add)

	const user = new CRUD({
		username,
		desc: desc_add,
	});
	console.log('======> Add data <======\nID: '+id+
				'\nUsername: '+username+
				'\nDescription: '+desc_add+
				'\n=====================');

	CRUD.findOneAndUpdate({'_id': id}, {$push: {'task': {'desc': desc_add}}}, {new: true}/*return updated data*/ ,function(err, doc) {
		if(err){
			console.log('======> Update status: Cannot Update');
		}else{
			console.log('======> Update status: Success!');
		}
		res.redirect('/manage');
	});
  });

  module.exports = router;