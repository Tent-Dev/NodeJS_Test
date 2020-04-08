const express = require('express');
const router = express.Router();
const CRUD = require('../models/model_user');
const CRUD_Task = require('../models/model_task');

router.post('/add', async (req, res) => {
	var id = req.user.id;
	console.log('======> Username ref: '+req.user.username)
	var { desc_add, task_name_add } = req.body;
	var username = req.user.username;
  
	// simple validation
	if (!desc_add) {
		console.log('======> Don\'t have description to add.')
		res.redirect('/manage');
	  	// return res.render('manage', { message: 'Please try again' });
	}
	console.log('======>Get data : '+desc_add+
				'======>Get data : '+task_name_add)

	console.log('======> Add data <======\nID: '+id+
				'\nUsername: '+username+
				'\nTask name: '+task_name_add+
				'\nDescription: '+desc_add+
				'\n=====================');
	var my_task = {
		account: username,
		task_name: task_name_add,
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

router.post('/query_task/:id',(req, res)=>{
	CRUD_Task.findOne({_id: req.params.id},(err, result)=>{
		if (err){
			console.log('======> Query result: Error');
			res.json({success: false, err_msg: err});
		}else{
			console.log('======> Query result: Below');
			console.log(result);
			res.json({success: true, data: result});
		}
		
	})
})

router.put('/update/:id/:desc',(req, res)=>{
	var now_date = new Date().toISOString();
	console.log(now_date);
	CRUD_Task.updateOne({_id: req.params.id},{$set:{desc: req.params.desc, time: now_date}})
	.then((obj) => {
		console.log('======> Updated: success');
		res.json({success: true, data: obj});
	}).catch((err) => {
		console.log('======> Updated: Error: ' + err);
		res.json({success: false, err_msg: err});
	})
})

router.delete('/delete/:id',(req, res)=>{
  CRUD_Task.deleteOne({_id: req.params.id})
  .then(() => {
	  res.json({success: true});
  }).catch((err) => {
	res.json({success: false, err_msg: err});
  });
})

router.put('/like/:id',(req, res)=>{
	console.log('======>data: '+req.body.like)
	CRUD_Task.updateOne({_id: req.params.id},{$inc: {likes_count: req.body.like}},(err, result)=>{
		if (err){
			console.log('======> Like result: Error');
			res.json({success: false, err_msg: err});
		}else{
			CRUD.updateOne({_id: req.user.id},{$push: {liked: {task_id: req.params.id}}},(err2, result2)=>{
				console.log('======>Account ID: '+req.user.id)
				if (err2){
					console.log('======> Save liked to account result: Error');
					res.json({success: false, err_msg: err2});
				}else{
					console.log('======> Save liked to account result: Below');
					console.log(result2);
					res.json({success: true});
				}
			})
		}
		
	})
})

  module.exports = router;