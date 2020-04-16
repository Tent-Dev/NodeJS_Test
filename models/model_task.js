const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const taskSchema = new Schema({
	time : {
		type : Date,
		default: Date.now
	},
	account: String,
	task_name: {
		type: String,
		default: "Untitle"
	},
	desc: String,
	likes_count: {
		type: Number,
		default: 0
	},
	comment:[{
		//_id: false,
		account_id: ObjectId,
		comment_desc: String,
		username: String,
		time : {
			type : Date,
			default: Date.now
		}
	}]
});

taskSchema.plugin(mongoosePaginate);

const TaskModel = mongoose.model('tasklists', taskSchema ,'tasklists');

module.exports = TaskModel;