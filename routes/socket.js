module.exports = function (io) {
	const CRUD_Task = require('../models/model_task');
	//SockeIO
	//console.log(session);

	io.on('connection', function(socket){
		socket.on('chat message', function(msg, username, task_id, account_id){
		console.log(username+': ' + msg);

		CRUD_Task.updateOne({_id: task_id},{$push:{comment: {account_id: account_id, comment_desc: msg, username: username}}})
		.then((obj) => {
			console.log('======> Save comment: success');
		}).catch((err) => {
			console.log('======> Save comment: Error: ');
		});

		io.emit('chat message', {message: msg, username: username});
		});
	});
}