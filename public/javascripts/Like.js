$(document).ready(function () {
	check_liked()
	$('.like_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Like id: '+id);

		if($(this).hasClass('btn-primary')){
			$(this).removeClass('btn-primary');
			$(this).addClass('btn-outline-primary');
			$(this).html('<i class="far fa-thumbs-up"></i> Like');
			var action = 'Unlike';
		}
		else if($(this).hasClass('btn-outline-primary')){
			$(this).removeClass('btn-outline-primary');
			$(this).addClass('btn-primary');
			$(this).html('<i class="far fa-thumbs-down"></i> Unlike');
			var action = 'Like';
		}

		const counter = action === 'Like' ? 1 : -1;
		console.log(counter);
		$.ajax({
			type: "PUT",
			url: "../CRUD/like/"+id+"/",
			data: {
				id: id,
				like: counter
			},
			success: function (data) {
				console.log(data)
				var like_old = parseInt($('.like-count[data-id="'+id+'"]').html());
				$('.like-count[data-id="'+id+'"]').html(like_old+counter);

			}
		});
	});
});

function check_liked(){
	var account_id = $('#account_id').text();
	$.ajax({
		type: "POST",
		url: "../CRUD/check_liked/"+account_id+"/",
		data: {
			id: account_id
		},
		success: function (result) {
			console.log(result);
			result.data.forEach((data)=>{
				console.log(data.task_id);
				$('.like_btn[data-id="'+data.task_id+'"]').removeClass('btn-outline-primary');
				$('.like_btn[data-id="'+data.task_id+'"]').addClass('btn-primary');
				$('.like_btn[data-id="'+data.task_id+'"]').html('<i class="far fa-thumbs-down"></i> Unlike');
			})
		}
	});
}