module.exports = function (io) {
	//SockeIO
	//console.log(session);

	io.on('connection', function(socket){
		socket.on('chat message', function(msg, username){
		console.log(username+': ' + msg);
		io.emit('chat message', {message: msg, username: username});
		});
	});
}