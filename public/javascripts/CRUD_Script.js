$(document).ready(function () {
	$('.delete_btn').click(function (e) { 
		id = $(this).attr('data-id');
		console.log('Delete select: '+id)
		e.preventDefault();
	});

	$('.edit_btn').click(function (e) { 
		id = $(this).attr('data-id');
		console.log('Edit select: '+id)
		e.preventDefault();
	});
});

function test() {
	$.ajax({
		type: "method",
		url: "url",
		data: "data",
		dataType: "dataType",
		success: function (response) {
			
		}
	});
}