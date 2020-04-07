const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var now_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
const taskSchema = new Schema({
	time : {
		type : Date,
		default: Date.now
	},
	account: String,
	task_name: String,
	desc: String,
	likes_count: {
		type: Number,
		default: 0
	}
});

const TaskModel = mongoose.model('tasklists', taskSchema ,'tasklists');

module.exports = TaskModel;