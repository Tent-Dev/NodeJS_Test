const express = require('express');
const router = express.Router();
const CRUD = require('../models/model_user');
const CRUD_Task = require('../models/model_task');

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

	console.log('======> Add data <======\nID: '+id+
				'\nUsername: '+username+
				'\nDescription: '+desc_add+
				'\n=====================');
	var my_task = {
		account: username,
		desc: desc_add
	}
	CRUD_Task.create(my_task ,function(err, doc) {
		if(err){
			console.log('======> Add status: Cannot Update');
		}else{
			console.log('======> Add status: Success!');
		}
		res.redirect('/manage');
	});
  });

router.delete('/delete/:id',(req, res)=>{
  CRUD_Task.deleteOne({_id: req.params.id})
  .then(() => {
	  res.json({success: true});
  }).catch((err) => {
	  res.status.json({err: err});
  });
})

  module.exports = router;