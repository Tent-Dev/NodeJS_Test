$(document).ready(function () {
	//open delete modal
	$('.delete_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Delete select: '+id)
		modal_delete(id)
	});

	$('.edit_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Edit select: '+id)
	});

	//Show display after click open delete modal
	$('.delete_ShowModal_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Delete select: '+id);
		$('.delete_btn').attr('data-id', id);
		$('#Modal_delete').modal('show');
		html = '<div align="center"><b>Delete Task: </b>'+id+'</div>';
		$('#show_content_delete').html(html);
	});

	//Reset id after modal close
	$('#Modal_delete').on('hidden.bs.modal', function (e) {
		$('.delete_btn').removeAttr('data-id');
	  })
});

function modal_delete(id) {
	$.ajax({
		type: "DELETE",
		url: "CRUD/delete/"+id,
		data: {
			id: id
		},
		success: function (res) {
			if (res.success) {
				console.log('id from ajax call is', res);
				window.location.reload();
			} else {
				console.log(res.err_msg);
				}
		}
	});
}