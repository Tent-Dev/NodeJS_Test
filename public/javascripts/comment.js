$(document).ready(function () {

	var socket = io();

	$('#comment_btn').click(function(e){
		e.preventDefault(); // prevents page reloading
		socket.emit('chat message', $('#mycomment').val(), $('#account_name').text());
		$('#mycomment').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		html = 	'<div class="col-1" style="margin-top: 20px; align-self: center;">'+
						'<img src="../images/user.png" width="50px" hight="50px" class="rounded-circle">'+
					'</div>'+
					'<div class="col-11" style="align-self: center;">'+
						'<div class="row">'+
							'<div class="col-12" style="padding-left: 0px;">'+
								msg.username+
							'</div>'+
							'<div class="comment_box">'+
								msg.message+
							'</div>'+
						'</div>'+
					'</div>';
		$('#comment').append(html);
	  });

});