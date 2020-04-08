$(document).ready(function () {
	console.log('<%= show_id %>')
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
			url: "CRUD/like/"+id+"/",
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