const express = require('express');
const router = express.Router();
const CRUD_Task = require('../models/model_task');

router.get('/:id',(req, res)=>{
	console.log('======> Page: '+req.params.id);
	CRUD_Task.findById({_id: req.params.id},(err,result)=>{
		if(err){
			res.render('task',{task:'err'});
		}else{
			if(result._id !== null)
				res.render('task',{task: result, show_id: req.user.id, moment: require('moment')});
			else
				res.render('task',{task:'err'});
		}
	})
})


module.exports = router;