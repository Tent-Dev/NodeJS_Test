const express = require('express');
const router = express.Router();
const CRUD = require('../models/model_user');

router.post('/add', async (req, res) => {
	console.log('======> Username ref: '+req.user.username)
	var { desc_add } = req.body;
	var id = req.user.id;
	var username = req.user.username;
  
	// simple validation
	if (!desc_add) {
	  return res.render('manage', { message: 'Please try again' });
	}

	const user = new CRUD({
		username,
		desc: desc_add,
	});
	console.log('======> Add data <======\nID: '+id+
				'\nUsername: '+username+
				'\nDescription: '+desc_add+
				'\n=====================');

	await CRUD.findOneAndUpdate({'_id': id}, {$push: {'task': {'desc': desc_add}}}, {new: true}/*return updated data*/ ,function(err, doc) {
		console.log('======> Update data: '+ doc.task)
		if(err){
			console.log('======> Update status: Cannot Update');
		}else{
			console.log('======> Update status: Success!');
		}
	});
	res.redirect('/manage');
  });

  module.exports = router;